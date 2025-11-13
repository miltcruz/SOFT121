USE [MyGuitarShop]
GO

ALTER TABLE [dbo].[Customers]
ADD 
    [IsActive] [bit] NULL CONSTRAINT DF_Customers_IsActive DEFAULT ((1)), -- Add IsActive column with default constraint
    [DateCreated] [datetime] NULL, -- Add DateCreated column
    [DateUpdated] [datetime] NULL; -- Add DateUpdated column
GO


UPDATE [dbo].[Customers]
   SET [IsActive] = 1
GO
