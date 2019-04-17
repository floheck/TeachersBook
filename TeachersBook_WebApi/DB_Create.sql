USE [master]
GO

/****** Object:  Database [TeachersBook]    Script Date: 13.07.2017 15:14:59 ******/
CREATE DATABASE [TeachersBook]
GO

ALTER DATABASE [TeachersBook] SET COMPATIBILITY_LEVEL = 130
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TeachersBook].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [TeachersBook] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [TeachersBook] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [TeachersBook] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [TeachersBook] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [TeachersBook] SET ARITHABORT OFF 
GO

ALTER DATABASE [TeachersBook] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [TeachersBook] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [TeachersBook] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [TeachersBook] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [TeachersBook] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [TeachersBook] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [TeachersBook] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [TeachersBook] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [TeachersBook] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [TeachersBook] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [TeachersBook] SET ALLOW_SNAPSHOT_ISOLATION ON 
GO

ALTER DATABASE [TeachersBook] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [TeachersBook] SET READ_COMMITTED_SNAPSHOT ON 
GO

ALTER DATABASE [TeachersBook] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [TeachersBook] SET  MULTI_USER 
GO

ALTER DATABASE [TeachersBook] SET DB_CHAINING OFF 
GO

ALTER DATABASE [TeachersBook] SET ENCRYPTION ON
GO

ALTER DATABASE [TeachersBook] SET QUERY_STORE = ON
GO

ALTER DATABASE [TeachersBook] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 7), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 10, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO)
GO

USE [TeachersBook]
GO

ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO

ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO

ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO

ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO

ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO

ALTER DATABASE [TeachersBook] SET  READ_WRITE 
GO

USE [TeachersBook]
GO

/****** Object:  Table [dbo].[Classes]    Script Date: 13.07.2017 15:16:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Classes](
	[id] [uniqueidentifier] NOT NULL,
	[name] [varchar](20) NOT NULL,
	[teacher] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Classes] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

ALTER TABLE [dbo].[Classes]  WITH CHECK ADD  CONSTRAINT [FK_Classes_UserData] FOREIGN KEY([teacher])
REFERENCES [dbo].[UserData] ([id])
GO

ALTER TABLE [dbo].[Classes] CHECK CONSTRAINT [FK_Classes_UserData]
GO

USE [TeachersBook]
GO

/****** Object:  Table [dbo].[Pupils]    Script Date: 13.07.2017 15:16:35 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Pupils](
	[id] [uniqueidentifier] NOT NULL,
	[nickName] [varchar](50) NOT NULL,
	[firstName] [varchar](100) NULL,
	[lastName] [varchar](100) NULL,
	[adress] [varchar](100) NULL,
	[postalCode] [int] NULL,
	[city] [varchar](100) NULL,
	[class] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Pupils] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

ALTER TABLE [dbo].[Pupils]  WITH CHECK ADD  CONSTRAINT [FK_Pupils_Classes] FOREIGN KEY([class])
REFERENCES [dbo].[Classes] ([id])
GO

ALTER TABLE [dbo].[Pupils] CHECK CONSTRAINT [FK_Pupils_Classes]
GO

USE [TeachersBook]
GO

/****** Object:  Table [dbo].[Subjects]    Script Date: 13.07.2017 15:17:22 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Subjects](
	[id] [uniqueidentifier] NOT NULL,
	[class] [uniqueidentifier] NULL,
	[description] [varchar](100) NULL,
	[color] [varchar](7) NULL,
 CONSTRAINT [PK_Subjects] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

USE [TeachersBook]
GO

/****** Object:  Table [dbo].[TimeTableBreaks]    Script Date: 13.07.2017 15:17:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TimeTableBreaks](
	[id] [uniqueidentifier] NOT NULL,
	[mon] [varchar](100) NULL,
	[tue] [varchar](100) NULL,
	[wed] [varchar](100) NULL,
	[thu] [varchar](100) NULL,
	[fri] [varchar](100) NULL,
	[sat] [varchar](100) NULL,
 CONSTRAINT [PK_TimeTableBreaks] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

USE [TeachersBook]
GO

/****** Object:  Table [dbo].[TimeTableRows]    Script Date: 13.07.2017 15:17:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TimeTableRows](
	[id] [uniqueidentifier] NOT NULL,
	[timeTable] [uniqueidentifier] NOT NULL,
	[rowType] [varchar](20) NOT NULL,
	[lessonNo] [int] NOT NULL,
	[timeTableSubjects] [uniqueidentifier] NULL,
	[timeTableBreaks] [uniqueidentifier] NULL,
	[time] [varchar](20) NOT NULL,
 CONSTRAINT [PK_TimeTableRows] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

ALTER TABLE [dbo].[TimeTableRows]  WITH CHECK ADD  CONSTRAINT [FK_TimeTableRows_TimeTableBreaks] FOREIGN KEY([timeTableBreaks])
REFERENCES [dbo].[TimeTableBreaks] ([id])
GO

ALTER TABLE [dbo].[TimeTableRows] CHECK CONSTRAINT [FK_TimeTableRows_TimeTableBreaks]
GO

ALTER TABLE [dbo].[TimeTableRows]  WITH CHECK ADD  CONSTRAINT [FK_TimeTableRows_TimeTables] FOREIGN KEY([timeTable])
REFERENCES [dbo].[TimeTables] ([id])
GO

ALTER TABLE [dbo].[TimeTableRows] CHECK CONSTRAINT [FK_TimeTableRows_TimeTables]
GO

ALTER TABLE [dbo].[TimeTableRows]  WITH CHECK ADD  CONSTRAINT [FK_TimeTableRows_TimeTableSubjects] FOREIGN KEY([timeTableSubjects])
REFERENCES [dbo].[TimeTableSubjects] ([id])
GO

ALTER TABLE [dbo].[TimeTableRows] CHECK CONSTRAINT [FK_TimeTableRows_TimeTableSubjects]
GO

USE [TeachersBook]
GO

/****** Object:  Table [dbo].[TimeTables]    Script Date: 13.07.2017 15:18:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TimeTables](
	[id] [uniqueidentifier] NOT NULL,
	[teacher] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_TimeTables] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

ALTER TABLE [dbo].[TimeTables]  WITH CHECK ADD  CONSTRAINT [FK_TimeTables_UserData] FOREIGN KEY([teacher])
REFERENCES [dbo].[UserData] ([id])
GO

ALTER TABLE [dbo].[TimeTables] CHECK CONSTRAINT [FK_TimeTables_UserData]
GO

USE [TeachersBook]
GO

/****** Object:  Table [dbo].[TimeTableSubjects]    Script Date: 13.07.2017 15:18:14 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TimeTableSubjects](
	[id] [uniqueidentifier] NOT NULL,
	[mon] [uniqueidentifier] NULL,
	[tue] [uniqueidentifier] NULL,
	[wed] [uniqueidentifier] NULL,
	[thu] [uniqueidentifier] NULL,
	[fri] [uniqueidentifier] NULL,
	[sat] [uniqueidentifier] NULL,
 CONSTRAINT [PK_TimeTableSubjects] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

ALTER TABLE [dbo].[TimeTableSubjects]  WITH CHECK ADD  CONSTRAINT [FK_TimeTableSubjects_Subjects] FOREIGN KEY([mon])
REFERENCES [dbo].[Subjects] ([id])
GO

ALTER TABLE [dbo].[TimeTableSubjects] CHECK CONSTRAINT [FK_TimeTableSubjects_Subjects]
GO

ALTER TABLE [dbo].[TimeTableSubjects]  WITH CHECK ADD  CONSTRAINT [FK_TimeTableSubjects_Subjects1] FOREIGN KEY([tue])
REFERENCES [dbo].[Subjects] ([id])
GO

ALTER TABLE [dbo].[TimeTableSubjects] CHECK CONSTRAINT [FK_TimeTableSubjects_Subjects1]
GO

ALTER TABLE [dbo].[TimeTableSubjects]  WITH CHECK ADD  CONSTRAINT [FK_TimeTableSubjects_Subjects2] FOREIGN KEY([wed])
REFERENCES [dbo].[Subjects] ([id])
GO

ALTER TABLE [dbo].[TimeTableSubjects] CHECK CONSTRAINT [FK_TimeTableSubjects_Subjects2]
GO

ALTER TABLE [dbo].[TimeTableSubjects]  WITH CHECK ADD  CONSTRAINT [FK_TimeTableSubjects_Subjects3] FOREIGN KEY([thu])
REFERENCES [dbo].[Subjects] ([id])
GO

ALTER TABLE [dbo].[TimeTableSubjects] CHECK CONSTRAINT [FK_TimeTableSubjects_Subjects3]
GO

ALTER TABLE [dbo].[TimeTableSubjects]  WITH CHECK ADD  CONSTRAINT [FK_TimeTableSubjects_Subjects4] FOREIGN KEY([fri])
REFERENCES [dbo].[Subjects] ([id])
GO

ALTER TABLE [dbo].[TimeTableSubjects] CHECK CONSTRAINT [FK_TimeTableSubjects_Subjects4]
GO

ALTER TABLE [dbo].[TimeTableSubjects]  WITH CHECK ADD  CONSTRAINT [FK_TimeTableSubjects_Subjects5] FOREIGN KEY([sat])
REFERENCES [dbo].[Subjects] ([id])
GO

ALTER TABLE [dbo].[TimeTableSubjects] CHECK CONSTRAINT [FK_TimeTableSubjects_Subjects5]
GO

USE [TeachersBook]
GO

/****** Object:  Table [dbo].[UserData]    Script Date: 13.07.2017 15:18:25 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[UserData](
	[id] [uniqueidentifier] NOT NULL,
	[username] [varchar](50) NOT NULL,
	[password] [char](64) NOT NULL,
	[firstname] [varchar](100) NOT NULL,
	[lastname] [varchar](100) NOT NULL,
	[email] [varchar](100) NULL,
	[isActive] [bit] NOT NULL,
	[role] [varchar](50) NULL,
 CONSTRAINT [PK_UserData] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)
GO

