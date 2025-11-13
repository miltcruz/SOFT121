USE [MyGuitarShop]
GO

ALTER TABLE [dbo].[Products]
ADD 
    [IsActive] [bit] NULL CONSTRAINT DF_Products_IsActive DEFAULT ((1)), -- Add IsActive column with default constraint
    [DateCreated] [datetime] NULL, -- Add DateCreated column
    [DateUpdated] [datetime] NULL; -- Add DateUpdated column
GO


UPDATE [dbo].[Products]
   SET [IsActive] = 1
GO
