using System;
using System.Security.Cryptography;

namespace SOFT121.Infrastructure.Security;

/// <summary>
/// Simple, secure password hashing helper using PBKDF2 (Rfc2898) with SHA-256.
/// Produces a string in the format: {iterations}.{saltBase64}.{hashBase64}
/// </summary>
public static class PasswordHasher
{
    private const int SaltSize = 16; // 128 bits
    private const int HashSize = 32; // 256 bits
    private const int DefaultIterations = 100_000;

    /// <summary>
    /// Hashes a plaintext password and returns an encoded string that contains
    /// the iteration count, salt, and hash.
    /// </summary>
    /// <param name="password">Plaintext password (not null).</param>
    /// <returns>Encoded hash string.</returns>
    public static string Hash(string password)
    {
        if (password == null) throw new ArgumentNullException(nameof(password));

        var salt = new byte[SaltSize];
        RandomNumberGenerator.Fill(salt);

        using var derive = new Rfc2898DeriveBytes(password, salt, DefaultIterations, HashAlgorithmName.SHA256);
        var hash = derive.GetBytes(HashSize);

        // Store as a single hex string: salt || hash (no separators)
        var saltHex = Convert.ToHexString(salt).ToLowerInvariant();
        var hashHex = Convert.ToHexString(hash).ToLowerInvariant();

        return saltHex + hashHex;
    }

    /// <summary>
    /// Verifies a plaintext password against an encoded hash string produced by <see cref="Hash"/>.
    /// </summary>
    /// <param name="encodedHash">Encoded hash string in the format produced by <see cref="Hash"/>.</param>
    /// <param name="password">Plaintext password to verify.</param>
    /// <returns>True if the password matches the hash; otherwise false.</returns>
    public static bool Verify(string encodedHash, string password)
    {
        if (string.IsNullOrWhiteSpace(encodedHash)) return false;
        if (password == null) throw new ArgumentNullException(nameof(password));

        // Expect a single hex string containing salt (first SaltSize bytes) followed by hash
        var combinedHex = encodedHash.Trim();
        var expectedCombinedLength = (SaltSize + HashSize) * 2; // hex chars
        if (combinedHex.Length != expectedCombinedLength) return false;

        byte[] salt;
        byte[] expectedHash;
        try
        {
            var saltHex = combinedHex.Substring(0, SaltSize * 2);
            var hashHex = combinedHex.Substring(SaltSize * 2);
            salt = Convert.FromHexString(saltHex);
            expectedHash = Convert.FromHexString(hashHex);
        }
        catch
        {
            return false;
        }

        using var derive = new Rfc2898DeriveBytes(password, salt, DefaultIterations, HashAlgorithmName.SHA256);
        var computedHash = derive.GetBytes(expectedHash.Length);

        return CryptographicOperations.FixedTimeEquals(expectedHash, computedHash);
    }
}
