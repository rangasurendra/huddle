# Database Schema Documentation

This document summarizes the AdventureWorks 2022 database schema. The tables are grouped by logical domain, with column definitions, constraints and important notes.

## User Management

### Table: `[Person].[Person]`

**Purpose:** Represents each person or contact in the system.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`BusinessEntityID`|int|NO||Primary key identifier|
|`PersonType`|nchar(2)|NO||Data column|
|`NameStyle`|dbo.NameStyle|NO||Descriptive name|
|`Title`|nvarchar(8)|YES||Data column|
|`FirstName`|dbo.Name|NO||Descriptive name|
|`MiddleName`|dbo.Name|YES||Descriptive name|
|`LastName`|dbo.Name|NO||Descriptive name|
|`Suffix`|nvarchar(10)|YES||Data column|
|`EmailPromotion`|int|NO||Email address|
|`AdditionalContactInfo`|xml(CONTENT|YES||Data column|
|`Demographics`|xml(CONTENT|YES||Data column|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Person].[Person]( 	[BusinessEntityID] [int] NOT NULL, 	[PersonType] [nchar](2) NOT NULL, 	[NameStyle] [dbo].[NameStyle] NOT NULL, 	[Title] [nvarchar](8) NULL, 	[FirstName] [dbo].[Name] NOT NULL, 	[MiddleName] [dbo].[Name] NULL, 	[LastName] [dbo].[Name] NOT NULL, 	[Suffix] [nvarchar](10) NULL, 	[EmailPromotion] [int] NOT NULL, 	[AdditionalContactInfo] [xml](CONTENT [Person].[AdditionalContactInfoSchemaCollection]) NULL, 	[Demographics] [xml](CONTENT [Person].[IndividualSurveySchemaCollection]) NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_Person_BusinessEntityID] PRIMARY KEY CLUSTERED ( 	[BusinessEntityID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_Person_BusinessEntityID.

- Contains `rowguid` column for unique replication identifiers.

- Column `AdditionalContactInfo` stores XML data.

- Column `Demographics` stores XML data.

- Contains foreign keys to related tables.


### Table: `[Person].[PersonPhone]`

**Purpose:** Associates people with their phone numbers.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`BusinessEntityID`|int|NO||Primary key identifier|
|`PhoneNumber`|dbo.Phone|NO||Phone number|
|`PhoneNumberTypeID`|int|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Person].[PersonPhone]( 	[BusinessEntityID] [int] NOT NULL, 	[PhoneNumber] [dbo].[Phone] NOT NULL, 	[PhoneNumberTypeID] [int] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_PersonPhone_BusinessEntityID_PhoneNumber_PhoneNumberTypeID] PRIMARY KEY CLUSTERED ( 	[BusinessEntityID] ASC, 	[PhoneNumber] ASC, 	[PhoneNumberTypeID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_PersonPhone_BusinessEntityID_PhoneNumber_PhoneNumberTypeID.

- Contains foreign keys to related tables.


### Table: `[Person].[PhoneNumberType]`

**Purpose:** Lookup for types of phone numbers.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`PhoneNumberTypeID`|int IDENTITY|NO||Primary key identifier|
|`Name`|dbo.Name|NO||Descriptive name|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Person].[PhoneNumberType]( 	[PhoneNumberTypeID] [int] IDENTITY(1,1) NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_PhoneNumberType_PhoneNumberTypeID] PRIMARY KEY CLUSTERED ( 	[PhoneNumberTypeID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_PhoneNumberType_PhoneNumberTypeID.


### Table: `[Person].[Address]`

**Purpose:** Stores addresses for business entities.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`AddressID`|int IDENTITY|NO||Primary key identifier|
|`AddressLine1`|nvarchar(60)|NO||Address information|
|`AddressLine2`|nvarchar(60)|YES||Address information|
|`City`|nvarchar(30)|NO||Address information|
|`StateProvinceID`|int|NO||Foreign key reference|
|`PostalCode`|nvarchar(15)|NO||Address information|
|`SpatialLocation`|geography|YES||Data column|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Person].[Address]( 	[AddressID] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL, 	[AddressLine1] [nvarchar](60) NOT NULL, 	[AddressLine2] [nvarchar](60) NULL, 	[City] [nvarchar](30) NOT NULL, 	[StateProvinceID] [int] NOT NULL, 	[PostalCode] [nvarchar](15) NOT NULL, 	[SpatialLocation] [geography] NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_Address_AddressID] PRIMARY KEY CLUSTERED ( 	[AddressID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_Address_AddressID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


### Table: `[Person].[StateProvince]`

**Purpose:** Lookup of states and provinces.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`StateProvinceID`|int IDENTITY|NO||Primary key identifier|
|`StateProvinceCode`|nchar(3)|NO||Data column|
|`CountryRegionCode`|nvarchar(3)|NO||Data column|
|`IsOnlyStateProvinceFlag`|dbo.Flag|NO||Boolean flag|
|`Name`|dbo.Name|NO||Descriptive name|
|`TerritoryID`|int|NO||Foreign key reference|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Person].[StateProvince]( 	[StateProvinceID] [int] IDENTITY(1,1) NOT NULL, 	[StateProvinceCode] [nchar](3) NOT NULL, 	[CountryRegionCode] [nvarchar](3) NOT NULL, 	[IsOnlyStateProvinceFlag] [dbo].[Flag] NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[TerritoryID] [int] NOT NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_StateProvince_StateProvinceID] PRIMARY KEY CLUSTERED ( 	[StateProvinceID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_StateProvince_StateProvinceID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


### Table: `[Person].[BusinessEntityAddress]`

**Purpose:** Junction table linking business entities and addresses.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`BusinessEntityID`|int|NO||Primary key identifier|
|`AddressID`|int|NO||Foreign key reference|
|`AddressTypeID`|int|NO||Foreign key reference|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Person].[BusinessEntityAddress]( 	[BusinessEntityID] [int] NOT NULL, 	[AddressID] [int] NOT NULL, 	[AddressTypeID] [int] NOT NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_BusinessEntityAddress_BusinessEntityID_AddressID_AddressTypeID] PRIMARY KEY CLUSTERED ( 	[BusinessEntityID] ASC, 	[AddressID] ASC, 	[AddressTypeID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_BusinessEntityAddress_BusinessEntityID_AddressID_AddressTypeID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


### Table: `[Person].[CountryRegion]`

**Purpose:** Lookup of countries and regions.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`CountryRegionCode`|nvarchar(3)|NO||Data column|
|`Name`|dbo.Name|NO||Descriptive name|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Person].[CountryRegion]( 	[CountryRegionCode] [nvarchar](3) NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_CountryRegion_CountryRegionCode] PRIMARY KEY CLUSTERED ( 	[CountryRegionCode] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_CountryRegion_CountryRegionCode.


### Table: `[Person].[EmailAddress]`

**Purpose:** Email addresses associated with people.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`BusinessEntityID`|int|NO||Primary key identifier|
|`EmailAddressID`|int IDENTITY|NO||Primary key identifier|
|`EmailAddress`|nvarchar(50)|YES||Email address|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Person].[EmailAddress]( 	[BusinessEntityID] [int] NOT NULL, 	[EmailAddressID] [int] IDENTITY(1,1) NOT NULL, 	[EmailAddress] [nvarchar](50) NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_EmailAddress_BusinessEntityID_EmailAddressID] PRIMARY KEY CLUSTERED ( 	[BusinessEntityID] ASC, 	[EmailAddressID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_EmailAddress_BusinessEntityID_EmailAddressID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


### Table: `[Person].[AddressType]`

**Purpose:** Defines kinds of addresses (home, mailing, billing).

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`AddressTypeID`|int IDENTITY|NO||Primary key identifier|
|`Name`|dbo.Name|NO||Descriptive name|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Person].[AddressType]( 	[AddressTypeID] [int] IDENTITY(1,1) NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_AddressType_AddressTypeID] PRIMARY KEY CLUSTERED ( 	[AddressTypeID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_AddressType_AddressTypeID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


### Table: `[Person].[BusinessEntityContact]`

**Purpose:** Associates contacts with business entities and contact types.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`BusinessEntityID`|int|NO||Primary key identifier|
|`PersonID`|int|NO||Foreign key reference|
|`ContactTypeID`|int|NO||Foreign key reference|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Person].[BusinessEntityContact]( 	[BusinessEntityID] [int] NOT NULL, 	[PersonID] [int] NOT NULL, 	[ContactTypeID] [int] NOT NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_BusinessEntityContact_BusinessEntityID_PersonID_ContactTypeID] PRIMARY KEY CLUSTERED ( 	[BusinessEntityID] ASC, 	[PersonID] ASC, 	[ContactTypeID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_BusinessEntityContact_BusinessEntityID_PersonID_ContactTypeID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


### Table: `[Person].[ContactType]`

**Purpose:** Lookup for types of contacts (buyer, marketing etc.).

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ContactTypeID`|int IDENTITY|NO||Primary key identifier|
|`Name`|dbo.Name|NO||Descriptive name|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Person].[ContactType]( 	[ContactTypeID] [int] IDENTITY(1,1) NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_ContactType_ContactTypeID] PRIMARY KEY CLUSTERED ( 	[ContactTypeID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ContactType_ContactTypeID.


### Table: `[Person].[BusinessEntity]`

**Purpose:** Base entity for all people or organisations.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`BusinessEntityID`|int IDENTITY|NO||Primary key identifier|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Person].[BusinessEntity]( 	[BusinessEntityID] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_BusinessEntity_BusinessEntityID] PRIMARY KEY CLUSTERED ( 	[BusinessEntityID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_BusinessEntity_BusinessEntityID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


### Table: `[Person].[Password]`

**Purpose:** Password hashes and salts for people logins.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`BusinessEntityID`|int|NO||Primary key identifier|
|`PasswordHash`|varchar(128)|NO||Hashed password|
|`PasswordSalt`|varchar(10)|NO||Hashed password|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Person].[Password]( 	[BusinessEntityID] [int] NOT NULL, 	[PasswordHash] [varchar](128) NOT NULL, 	[PasswordSalt] [varchar](10) NOT NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_Password_BusinessEntityID] PRIMARY KEY CLUSTERED ( 	[BusinessEntityID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_Password_BusinessEntityID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


## Human Resources

### Table: `[HumanResources].[Employee]`

**Purpose:** Employee demographic and organizational information.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`BusinessEntityID`|int|NO||Primary key identifier|
|`NationalIDNumber`|nvarchar(15)|NO||Data column|
|`LoginID`|nvarchar(256)|NO||Foreign key reference|
|`OrganizationNode`|hierarchyid|YES||Data column|
|`OrganizationLevel`|AS (OrganizationNode.GetLevel()|||Data column|
|`JobTitle`|nvarchar(50)|NO||Data column|
|`BirthDate`|date|NO||Date/time|
|`MaritalStatus`|nchar(1)|NO||Data column|
|`Gender`|nchar(1)|NO||Data column|
|`HireDate`|date|NO||Date/time|
|`SalariedFlag`|dbo.Flag|NO||Boolean flag|
|`VacationHours`|smallint|NO||Data column|
|`SickLeaveHours`|smallint|NO||Data column|
|`CurrentFlag`|dbo.Flag|NO||Boolean flag|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [HumanResources].[Employee]( 	[BusinessEntityID] [int] NOT NULL, 	[NationalIDNumber] [nvarchar](15) NOT NULL, 	[LoginID] [nvarchar](256) NOT NULL, 	[OrganizationNode] [hierarchyid] NULL, 	[OrganizationLevel]  AS ([OrganizationNode].[GetLevel]()), 	[JobTitle] [nvarchar](50) NOT NULL, 	[BirthDate] [date] NOT NULL, 	[MaritalStatus] [nchar](1) NOT NULL, 	[Gender] [nchar](1) NOT NULL, 	[HireDate] [date] NOT NULL, 	[SalariedFlag] [dbo].[Flag] NOT NULL, 	[VacationHours] [smallint] NOT NULL, 	[SickLeaveHours] [smallint] NOT NULL, 	[CurrentFlag] [dbo].[Flag] NOT NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_Employee_BusinessEntityID] PRIMARY KEY CLUSTERED ( 	[BusinessEntityID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_Employee_BusinessEntityID.

- Contains `rowguid` column for unique replication identifiers.

- `OrganizationLevel` is a computed column.

- Contains foreign keys to related tables.


### Table: `[HumanResources].[Department]`

**Purpose:** Department definitions.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`DepartmentID`|smallint IDENTITY|NO||Primary key identifier|
|`Name`|dbo.Name|NO||Descriptive name|
|`GroupName`|dbo.Name|NO||Descriptive name|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [HumanResources].[Department]( 	[DepartmentID] [smallint] IDENTITY(1,1) NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[GroupName] [dbo].[Name] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_Department_DepartmentID] PRIMARY KEY CLUSTERED ( 	[DepartmentID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_Department_DepartmentID.


### Table: `[HumanResources].[EmployeeDepartmentHistory]`

**Purpose:** Tracks department assignments over time.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`BusinessEntityID`|int|NO||Primary key identifier|
|`DepartmentID`|smallint|NO||Foreign key reference|
|`ShiftID`|tinyint|NO||Foreign key reference|
|`StartDate`|date|NO||Date/time|
|`EndDate`|date|YES||Date/time|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [HumanResources].[EmployeeDepartmentHistory]( 	[BusinessEntityID] [int] NOT NULL, 	[DepartmentID] [smallint] NOT NULL, 	[ShiftID] [tinyint] NOT NULL, 	[StartDate] [date] NOT NULL, 	[EndDate] [date] NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_EmployeeDepartmentHistory_BusinessEntityID_StartDate_DepartmentID] PRIMARY KEY CLUSTERED ( 	[BusinessEntityID] ASC, 	[StartDate] ASC, 	[DepartmentID] ASC, 	[ShiftID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_EmployeeDepartmentHistory_BusinessEntityID_StartDate_DepartmentID.

- Contains foreign keys to related tables.


### Table: `[HumanResources].[Shift]`

**Purpose:** Work shift definitions.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ShiftID`|tinyint IDENTITY|NO||Primary key identifier|
|`Name`|dbo.Name|NO||Descriptive name|
|`StartTime`|time(7)|NO||Data column|
|`EndTime`|time(7)|NO||Data column|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [HumanResources].[Shift]( 	[ShiftID] [tinyint] IDENTITY(1,1) NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[StartTime] [time](7) NOT NULL, 	[EndTime] [time](7) NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_Shift_ShiftID] PRIMARY KEY CLUSTERED ( 	[ShiftID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_Shift_ShiftID.


### Table: `[HumanResources].[JobCandidate]`

**Purpose:** Stores resumes and information for job applicants.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`JobCandidateID`|int IDENTITY|NO||Primary key identifier|
|`BusinessEntityID`|int|YES||Primary key identifier|
|`Resume`|xml(CONTENT|YES||Data column|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [HumanResources].[JobCandidate]( 	[JobCandidateID] [int] IDENTITY(1,1) NOT NULL, 	[BusinessEntityID] [int] NULL, 	[Resume] [xml](CONTENT [HumanResources].[HRResumeSchemaCollection]) NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_JobCandidate_JobCandidateID] PRIMARY KEY CLUSTERED ( 	[JobCandidateID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_JobCandidate_JobCandidateID.

- Column `Resume` stores XML data.


### Table: `[HumanResources].[EmployeePayHistory]`

**Purpose:** Historical pay rates for employees.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`BusinessEntityID`|int|NO||Primary key identifier|
|`RateChangeDate`|datetime|NO||Date/time|
|`Rate`|money|NO||Monetary value|
|`PayFrequency`|tinyint|NO||Data column|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [HumanResources].[EmployeePayHistory]( 	[BusinessEntityID] [int] NOT NULL, 	[RateChangeDate] [datetime] NOT NULL, 	[Rate] [money] NOT NULL, 	[PayFrequency] [tinyint] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_EmployeePayHistory_BusinessEntityID_RateChangeDate] PRIMARY KEY CLUSTERED ( 	[BusinessEntityID] ASC, 	[RateChangeDate] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_EmployeePayHistory_BusinessEntityID_RateChangeDate.


## Products

### Table: `[Production].[Product]`

**Purpose:** Details of manufactured or sold products.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ProductID`|int IDENTITY|NO||Primary key identifier|
|`Name`|dbo.Name|NO||Descriptive name|
|`ProductNumber`|nvarchar(25)|NO||Data column|
|`MakeFlag`|dbo.Flag|NO||Boolean flag|
|`FinishedGoodsFlag`|dbo.Flag|NO||Boolean flag|
|`Color`|nvarchar(15)|YES||Data column|
|`SafetyStockLevel`|smallint|NO||Data column|
|`ReorderPoint`|smallint|NO||Data column|
|`StandardCost`|money|NO||Monetary value|
|`ListPrice`|money|NO||Monetary value|
|`Size`|nvarchar(5)|YES||Data column|
|`SizeUnitMeasureCode`|nchar(3)|YES||Data column|
|`WeightUnitMeasureCode`|nchar(3)|YES||Data column|
|`Weight`|decimal(8,|YES||Data column|
|`DaysToManufacture`|int|NO||Data column|
|`ProductLine`|nchar(2)|YES||Line number|
|`Class`|nchar(2)|YES||Data column|
|`Style`|nchar(2)|YES||Data column|
|`ProductSubcategoryID`|int|YES||Foreign key reference|
|`ProductModelID`|int|YES||Foreign key reference|
|`SellStartDate`|datetime|NO||Date/time|
|`SellEndDate`|datetime|YES||Date/time|
|`DiscontinuedDate`|datetime|YES||Date/time|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[Product]( 	[ProductID] [int] IDENTITY(1,1) NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[ProductNumber] [nvarchar](25) NOT NULL, 	[MakeFlag] [dbo].[Flag] NOT NULL, 	[FinishedGoodsFlag] [dbo].[Flag] NOT NULL, 	[Color] [nvarchar](15) NULL, 	[SafetyStockLevel] [smallint] NOT NULL, 	[ReorderPoint] [smallint] NOT NULL, 	[StandardCost] [money] NOT NULL, 	[ListPrice] [money] NOT NULL, 	[Size] [nvarchar](5) NULL, 	[SizeUnitMeasureCode] [nchar](3) NULL, 	[WeightUnitMeasureCode] [nchar](3) NULL, 	[Weight] [decimal](8, 2) NULL, 	[DaysToManufacture] [int] NOT NULL, 	[ProductLine] [nchar](2) NULL, 	[Class] [nchar](2) NULL, 	[Style] [nchar](2) NULL, 	[ProductSubcategoryID] [int] NULL, 	[ProductModelID] [int] NULL, 	[SellStartDate] [datetime] NOT NULL, 	[SellEndDate] [datetime] NULL, 	[DiscontinuedDate] [datetime] NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, ...`

**Notes**

- Primary key on PK_Product_ProductID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


### Table: `[Production].[ProductDescription]`

**Purpose:** Language‑specific text descriptions of products.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ProductDescriptionID`|int IDENTITY|NO||Primary key identifier|
|`Description`|nvarchar(400)|NO||Description|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[ProductDescription]( 	[ProductDescriptionID] [int] IDENTITY(1,1) NOT NULL, 	[Description] [nvarchar](400) NOT NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_ProductDescription_ProductDescriptionID] PRIMARY KEY CLUSTERED ( 	[ProductDescriptionID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ProductDescription_ProductDescriptionID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


### Table: `[Production].[ProductModel]`

**Purpose:** Generic definition of a product model.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ProductModelID`|int IDENTITY|NO||Primary key identifier|
|`Name`|dbo.Name|NO||Descriptive name|
|`CatalogDescription`|xml(CONTENT|YES||Description|
|`Instructions`|xml(CONTENT|YES||Data column|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[ProductModel]( 	[ProductModelID] [int] IDENTITY(1,1) NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[CatalogDescription] [xml](CONTENT [Production].[ProductDescriptionSchemaCollection]) NULL, 	[Instructions] [xml](CONTENT [Production].[ManuInstructionsSchemaCollection]) NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_ProductModel_ProductModelID] PRIMARY KEY CLUSTERED ( 	[ProductModelID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ProductModel_ProductModelID.

- Contains `rowguid` column for unique replication identifiers.

- Column `CatalogDescription` stores XML data.

- Column `Instructions` stores XML data.

- Contains foreign keys to related tables.


### Table: `[Production].[ProductModelProductDescriptionCulture]`

**Purpose:** Many‑to‑many link between product models and descriptions across cultures.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ProductModelID`|int|NO||Foreign key reference|
|`ProductDescriptionID`|int|NO||Foreign key reference|
|`CultureID`|nchar(6)|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[ProductModelProductDescriptionCulture]( 	[ProductModelID] [int] NOT NULL, 	[ProductDescriptionID] [int] NOT NULL, 	[CultureID] [nchar](6) NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_ProductModelProductDescriptionCulture_ProductModelID_ProductDescriptionID_CultureID] PRIMARY KEY CLUSTERED ( 	[ProductModelID] ASC, 	[ProductDescriptionID] ASC, 	[CultureID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ProductModelProductDescriptionCulture_ProductModelID_ProductDescriptionID_CultureID.

- Contains foreign keys to related tables.


### Table: `[Production].[BillOfMaterials]`

**Purpose:** Recursive bill of materials for product assemblies.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`BillOfMaterialsID`|int IDENTITY|NO||Primary key identifier|
|`ProductAssemblyID`|int|YES||Foreign key reference|
|`ComponentID`|int|NO||Foreign key reference|
|`StartDate`|datetime|NO||Date/time|
|`EndDate`|datetime|YES||Date/time|
|`UnitMeasureCode`|nchar(3)|NO||Data column|
|`BOMLevel`|smallint|NO||Data column|
|`PerAssemblyQty`|decimal(8,|NO||Quantity|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[BillOfMaterials]( 	[BillOfMaterialsID] [int] IDENTITY(1,1) NOT NULL, 	[ProductAssemblyID] [int] NULL, 	[ComponentID] [int] NOT NULL, 	[StartDate] [datetime] NOT NULL, 	[EndDate] [datetime] NULL, 	[UnitMeasureCode] [nchar](3) NOT NULL, 	[BOMLevel] [smallint] NOT NULL, 	[PerAssemblyQty] [decimal](8, 2) NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_BillOfMaterials_BillOfMaterialsID] PRIMARY KEY NONCLUSTERED ( 	[BillOfMaterialsID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_BillOfMaterials_BillOfMaterialsID.

- Contains foreign keys to related tables.


### Table: `[Production].[Culture]`

**Purpose:** Supported culture codes.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`CultureID`|nchar(6)|NO||Primary key identifier|
|`Name`|dbo.Name|NO||Descriptive name|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[Culture]( 	[CultureID] [nchar](6) NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_Culture_CultureID] PRIMARY KEY CLUSTERED ( 	[CultureID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_Culture_CultureID.


### Table: `[Production].[Document]`

**Purpose:** Company documents stored as files.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`DocumentNode`|hierarchyid|NO||Document|
|`DocumentLevel`|AS (DocumentNode.GetLevel()|||Document|
|`Title`|nvarchar(50)|NO||Data column|
|`Owner`|int|NO||Data column|
|`FolderFlag`|bit|NO||Boolean flag|
|`FileName`|nvarchar(400)|NO||Descriptive name|
|`FileExtension`|nvarchar(8)|NO||Document|
|`Revision`|nchar(5)|NO||Data column|
|`ChangeNumber`|int|NO||Data column|
|`Status`|tinyint|NO||Data column|
|`DocumentSummary`|nvarchar(max)|YES||Document|
|`Document`|varbinary(max)|YES||Document|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[Document]( 	[DocumentNode] [hierarchyid] NOT NULL, 	[DocumentLevel]  AS ([DocumentNode].[GetLevel]()), 	[Title] [nvarchar](50) NOT NULL, 	[Owner] [int] NOT NULL, 	[FolderFlag] [bit] NOT NULL, 	[FileName] [nvarchar](400) NOT NULL, 	[FileExtension] [nvarchar](8) NOT NULL, 	[Revision] [nchar](5) NOT NULL, 	[ChangeNumber] [int] NOT NULL, 	[Status] [tinyint] NOT NULL, 	[DocumentSummary] [nvarchar](max) NULL, 	[Document] [varbinary](max) NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_Document_DocumentNode] PRIMARY KEY CLUSTERED ( 	[DocumentNode] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],`

**Notes**

- Primary key on PK_Document_DocumentNode.

- Contains `rowguid` column for unique replication identifiers.

- `DocumentLevel` is a computed column.

- Contains foreign keys to related tables.


### Table: `[Production].[Illustration]`

**Purpose:** Illustrations for product models.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`IllustrationID`|int IDENTITY|NO||Primary key identifier|
|`Diagram`|xml|YES||Data column|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[Illustration]( 	[IllustrationID] [int] IDENTITY(1,1) NOT NULL, 	[Diagram] [xml] NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_Illustration_IllustrationID] PRIMARY KEY CLUSTERED ( 	[IllustrationID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_Illustration_IllustrationID.

- Column `Diagram` stores XML data.


### Table: `[Production].[Location]`

**Purpose:** Work center locations inside plants.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`LocationID`|smallint IDENTITY|NO||Primary key identifier|
|`Name`|dbo.Name|NO||Descriptive name|
|`CostRate`|smallmoney|NO||Monetary value|
|`Availability`|decimal(8,|NO||Data column|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[Location]( 	[LocationID] [smallint] IDENTITY(1,1) NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[CostRate] [smallmoney] NOT NULL, 	[Availability] [decimal](8, 2) NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_Location_LocationID] PRIMARY KEY CLUSTERED ( 	[LocationID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_Location_LocationID.


### Table: `[Production].[ProductCategory]`

**Purpose:** High‑level categories of products.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ProductCategoryID`|int IDENTITY|NO||Primary key identifier|
|`Name`|dbo.Name|NO||Descriptive name|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[ProductCategory]( 	[ProductCategoryID] [int] IDENTITY(1,1) NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_ProductCategory_ProductCategoryID] PRIMARY KEY CLUSTERED ( 	[ProductCategoryID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ProductCategory_ProductCategoryID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


### Table: `[Production].[ProductCostHistory]`

**Purpose:** Historical standard costs for products.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ProductID`|int|NO||Primary key identifier|
|`StartDate`|datetime|NO||Date/time|
|`EndDate`|datetime|YES||Date/time|
|`StandardCost`|money|NO||Monetary value|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[ProductCostHistory]( 	[ProductID] [int] NOT NULL, 	[StartDate] [datetime] NOT NULL, 	[EndDate] [datetime] NULL, 	[StandardCost] [money] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_ProductCostHistory_ProductID_StartDate] PRIMARY KEY CLUSTERED ( 	[ProductID] ASC, 	[StartDate] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ProductCostHistory_ProductID_StartDate.

- Contains foreign keys to related tables.


### Table: `[Production].[ProductDocument]`

**Purpose:** Links products to related documents.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ProductID`|int|NO||Primary key identifier|
|`DocumentNode`|hierarchyid|NO||Document|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[ProductDocument]( 	[ProductID] [int] NOT NULL, 	[DocumentNode] [hierarchyid] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_ProductDocument_ProductID_DocumentNode] PRIMARY KEY CLUSTERED ( 	[ProductID] ASC, 	[DocumentNode] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ProductDocument_ProductID_DocumentNode.

- Contains foreign keys to related tables.


### Table: `[Production].[ProductInventory]`

**Purpose:** Inventory levels by product and location.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ProductID`|int|NO||Primary key identifier|
|`LocationID`|smallint|NO||Foreign key reference|
|`Shelf`|nvarchar(10)|NO||Data column|
|`Bin`|tinyint|NO||Data column|
|`Quantity`|smallint|NO||Quantity|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[ProductInventory]( 	[ProductID] [int] NOT NULL, 	[LocationID] [smallint] NOT NULL, 	[Shelf] [nvarchar](10) NOT NULL, 	[Bin] [tinyint] NOT NULL, 	[Quantity] [smallint] NOT NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_ProductInventory_ProductID_LocationID] PRIMARY KEY CLUSTERED ( 	[ProductID] ASC, 	[LocationID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ProductInventory_ProductID_LocationID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


### Table: `[Production].[ProductListPriceHistory]`

**Purpose:** Historical list prices for products.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ProductID`|int|NO||Primary key identifier|
|`StartDate`|datetime|NO||Date/time|
|`EndDate`|datetime|YES||Date/time|
|`ListPrice`|money|NO||Monetary value|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[ProductListPriceHistory]( 	[ProductID] [int] NOT NULL, 	[StartDate] [datetime] NOT NULL, 	[EndDate] [datetime] NULL, 	[ListPrice] [money] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_ProductListPriceHistory_ProductID_StartDate] PRIMARY KEY CLUSTERED ( 	[ProductID] ASC, 	[StartDate] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ProductListPriceHistory_ProductID_StartDate.

- Contains foreign keys to related tables.


### Table: `[Production].[ProductModelIllustration]`

**Purpose:** Links product models to illustrations.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ProductModelID`|int|NO||Foreign key reference|
|`IllustrationID`|int|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[ProductModelIllustration]( 	[ProductModelID] [int] NOT NULL, 	[IllustrationID] [int] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_ProductModelIllustration_ProductModelID_IllustrationID] PRIMARY KEY CLUSTERED ( 	[ProductModelID] ASC, 	[IllustrationID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ProductModelIllustration_ProductModelID_IllustrationID.

- Contains foreign keys to related tables.


### Table: `[Production].[ProductPhoto]`

**Purpose:** Photographs of products.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ProductPhotoID`|int IDENTITY|NO||Primary key identifier|
|`ThumbNailPhoto`|varbinary(max)|YES||Image|
|`ThumbnailPhotoFileName`|nvarchar(50)|YES||Descriptive name|
|`LargePhoto`|varbinary(max)|YES||Image|
|`LargePhotoFileName`|nvarchar(50)|YES||Descriptive name|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[ProductPhoto]( 	[ProductPhotoID] [int] IDENTITY(1,1) NOT NULL, 	[ThumbNailPhoto] [varbinary](max) NULL, 	[ThumbnailPhotoFileName] [nvarchar](50) NULL, 	[LargePhoto] [varbinary](max) NULL, 	[LargePhotoFileName] [nvarchar](50) NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_ProductPhoto_ProductPhotoID] PRIMARY KEY CLUSTERED ( 	[ProductPhotoID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ProductPhoto_ProductPhotoID.


### Table: `[Production].[ProductProductPhoto]`

**Purpose:** Associates products with photos.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ProductID`|int|NO||Primary key identifier|
|`ProductPhotoID`|int|NO||Foreign key reference|
|`Primary`|dbo.Flag|NO||Data column|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[ProductProductPhoto]( 	[ProductID] [int] NOT NULL, 	[ProductPhotoID] [int] NOT NULL, 	[Primary] [dbo].[Flag] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_ProductProductPhoto_ProductID_ProductPhotoID] PRIMARY KEY NONCLUSTERED ( 	[ProductID] ASC, 	[ProductPhotoID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ProductProductPhoto_ProductID_ProductPhotoID.

- Contains foreign keys to related tables.


### Table: `[Production].[ProductReview]`

**Purpose:** Customer product reviews.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ProductReviewID`|int IDENTITY|NO||Primary key identifier|
|`ProductID`|int|NO||Primary key identifier|
|`ReviewerName`|dbo.Name|NO||Descriptive name|
|`ReviewDate`|datetime|NO||Date/time|
|`EmailAddress`|nvarchar(50)|NO||Email address|
|`Rating`|int|NO||Data column|
|`Comments`|nvarchar(3850)|YES||Data column|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[ProductReview]( 	[ProductReviewID] [int] IDENTITY(1,1) NOT NULL, 	[ProductID] [int] NOT NULL, 	[ReviewerName] [dbo].[Name] NOT NULL, 	[ReviewDate] [datetime] NOT NULL, 	[EmailAddress] [nvarchar](50) NOT NULL, 	[Rating] [int] NOT NULL, 	[Comments] [nvarchar](3850) NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_ProductReview_ProductReviewID] PRIMARY KEY CLUSTERED ( 	[ProductReviewID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ProductReview_ProductReviewID.

- Contains foreign keys to related tables.


### Table: `[Production].[ProductSubcategory]`

**Purpose:** Subcategories of products.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ProductSubcategoryID`|int IDENTITY|NO||Primary key identifier|
|`ProductCategoryID`|int|NO||Foreign key reference|
|`Name`|dbo.Name|NO||Descriptive name|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[ProductSubcategory]( 	[ProductSubcategoryID] [int] IDENTITY(1,1) NOT NULL, 	[ProductCategoryID] [int] NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_ProductSubcategory_ProductSubcategoryID] PRIMARY KEY CLUSTERED ( 	[ProductSubcategoryID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ProductSubcategory_ProductSubcategoryID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


### Table: `[Production].[ScrapReason]`

**Purpose:** Reasons for scrapped material.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ScrapReasonID`|smallint IDENTITY|NO||Primary key identifier|
|`Name`|dbo.Name|NO||Descriptive name|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[ScrapReason]( 	[ScrapReasonID] [smallint] IDENTITY(1,1) NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_ScrapReason_ScrapReasonID] PRIMARY KEY CLUSTERED ( 	[ScrapReasonID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ScrapReason_ScrapReasonID.


### Table: `[Production].[TransactionHistory]`

**Purpose:** Inventory transactions.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`TransactionID`|int IDENTITY|NO||Foreign key reference|
|`ProductID`|int|NO||Primary key identifier|
|`ReferenceOrderID`|int|NO||Foreign key reference|
|`ReferenceOrderLineID`|int|NO||Foreign key reference|
|`TransactionDate`|datetime|NO||Date/time|
|`TransactionType`|nchar(1)|NO||Data column|
|`Quantity`|int|NO||Quantity|
|`ActualCost`|money|NO||Monetary value|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[TransactionHistory]( 	[TransactionID] [int] IDENTITY(100000,1) NOT NULL, 	[ProductID] [int] NOT NULL, 	[ReferenceOrderID] [int] NOT NULL, 	[ReferenceOrderLineID] [int] NOT NULL, 	[TransactionDate] [datetime] NOT NULL, 	[TransactionType] [nchar](1) NOT NULL, 	[Quantity] [int] NOT NULL, 	[ActualCost] [money] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_TransactionHistory_TransactionID] PRIMARY KEY CLUSTERED ( 	[TransactionID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_TransactionHistory_TransactionID.

- Contains foreign keys to related tables.


### Table: `[Production].[TransactionHistoryArchive]`

**Purpose:** Archived transaction history.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`TransactionID`|int|NO||Foreign key reference|
|`ProductID`|int|NO||Primary key identifier|
|`ReferenceOrderID`|int|NO||Foreign key reference|
|`ReferenceOrderLineID`|int|NO||Foreign key reference|
|`TransactionDate`|datetime|NO||Date/time|
|`TransactionType`|nchar(1)|NO||Data column|
|`Quantity`|int|NO||Quantity|
|`ActualCost`|money|NO||Monetary value|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[TransactionHistoryArchive]( 	[TransactionID] [int] NOT NULL, 	[ProductID] [int] NOT NULL, 	[ReferenceOrderID] [int] NOT NULL, 	[ReferenceOrderLineID] [int] NOT NULL, 	[TransactionDate] [datetime] NOT NULL, 	[TransactionType] [nchar](1) NOT NULL, 	[Quantity] [int] NOT NULL, 	[ActualCost] [money] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_TransactionHistoryArchive_TransactionID] PRIMARY KEY CLUSTERED ( 	[TransactionID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_TransactionHistoryArchive_TransactionID.

- Contains foreign keys to related tables.


### Table: `[Production].[UnitMeasure]`

**Purpose:** Units of measure for quantities.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`UnitMeasureCode`|nchar(3)|NO||Data column|
|`Name`|dbo.Name|NO||Descriptive name|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[UnitMeasure]( 	[UnitMeasureCode] [nchar](3) NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_UnitMeasure_UnitMeasureCode] PRIMARY KEY CLUSTERED ( 	[UnitMeasureCode] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_UnitMeasure_UnitMeasureCode.


### Table: `[Production].[WorkOrder]`

**Purpose:** Work orders for manufacturing.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`WorkOrderID`|int IDENTITY|NO||Primary key identifier|
|`ProductID`|int|NO||Primary key identifier|
|`OrderQty`|int|NO||Quantity|
|`StockedQty`|AS (isnull(OrderQty-ScrappedQty,(0)|YES||Quantity|
|`ScrappedQty`|smallint|NO||Quantity|
|`StartDate`|datetime|NO||Date/time|
|`EndDate`|datetime|YES||Date/time|
|`DueDate`|datetime|NO||Date/time|
|`ScrapReasonID`|smallint|YES||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[WorkOrder]( 	[WorkOrderID] [int] IDENTITY(1,1) NOT NULL, 	[ProductID] [int] NOT NULL, 	[OrderQty] [int] NOT NULL, 	[StockedQty]  AS (isnull([OrderQty]-[ScrappedQty],(0))), 	[ScrappedQty] [smallint] NOT NULL, 	[StartDate] [datetime] NOT NULL, 	[EndDate] [datetime] NULL, 	[DueDate] [datetime] NOT NULL, 	[ScrapReasonID] [smallint] NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_WorkOrder_WorkOrderID] PRIMARY KEY CLUSTERED ( 	[WorkOrderID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_WorkOrder_WorkOrderID.

- `StockedQty` is a computed column.

- Contains foreign keys to related tables.


### Table: `[Production].[WorkOrderRouting]`

**Purpose:** Work center routing steps for work orders.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`WorkOrderID`|int|NO||Primary key identifier|
|`ProductID`|int|NO||Primary key identifier|
|`OperationSequence`|smallint|NO||Data column|
|`LocationID`|smallint|NO||Foreign key reference|
|`ScheduledStartDate`|datetime|NO||Date/time|
|`ScheduledEndDate`|datetime|NO||Date/time|
|`ActualStartDate`|datetime|YES||Date/time|
|`ActualEndDate`|datetime|YES||Date/time|
|`ActualResourceHrs`|decimal(9,|YES||Data column|
|`PlannedCost`|money|NO||Monetary value|
|`ActualCost`|money|YES||Monetary value|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Production].[WorkOrderRouting]( 	[WorkOrderID] [int] NOT NULL, 	[ProductID] [int] NOT NULL, 	[OperationSequence] [smallint] NOT NULL, 	[LocationID] [smallint] NOT NULL, 	[ScheduledStartDate] [datetime] NOT NULL, 	[ScheduledEndDate] [datetime] NOT NULL, 	[ActualStartDate] [datetime] NULL, 	[ActualEndDate] [datetime] NULL, 	[ActualResourceHrs] [decimal](9, 4) NULL, 	[PlannedCost] [money] NOT NULL, 	[ActualCost] [money] NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_WorkOrderRouting_WorkOrderID_ProductID_OperationSequence] PRIMARY KEY CLUSTERED ( 	[WorkOrderID] ASC, 	[ProductID] ASC, 	[OperationSequence] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_WorkOrderRouting_WorkOrderID_ProductID_OperationSequence.

- Contains foreign keys to related tables.


## Purchasing

### Table: `[Purchasing].[Vendor]`

**Purpose:** Suppliers and vendors.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`BusinessEntityID`|int|NO||Primary key identifier|
|`AccountNumber`|dbo.AccountNumber|NO||Data column|
|`Name`|dbo.Name|NO||Descriptive name|
|`CreditRating`|tinyint|NO||Data column|
|`PreferredVendorStatus`|dbo.Flag|NO||Data column|
|`ActiveFlag`|dbo.Flag|NO||Boolean flag|
|`PurchasingWebServiceURL`|nvarchar(1024)|YES||Data column|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Purchasing].[Vendor]( 	[BusinessEntityID] [int] NOT NULL, 	[AccountNumber] [dbo].[AccountNumber] NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[CreditRating] [tinyint] NOT NULL, 	[PreferredVendorStatus] [dbo].[Flag] NOT NULL, 	[ActiveFlag] [dbo].[Flag] NOT NULL, 	[PurchasingWebServiceURL] [nvarchar](1024) NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_Vendor_BusinessEntityID] PRIMARY KEY CLUSTERED ( 	[BusinessEntityID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_Vendor_BusinessEntityID.


### Table: `[Purchasing].[ProductVendor]`

**Purpose:** Links products to suppliers with purchasing data.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ProductID`|int|NO||Primary key identifier|
|`BusinessEntityID`|int|NO||Primary key identifier|
|`AverageLeadTime`|int|NO||Data column|
|`StandardPrice`|money|NO||Monetary value|
|`LastReceiptCost`|money|YES||Monetary value|
|`LastReceiptDate`|datetime|YES||Date/time|
|`MinOrderQty`|int|NO||Quantity|
|`MaxOrderQty`|int|NO||Quantity|
|`OnOrderQty`|int|YES||Quantity|
|`UnitMeasureCode`|nchar(3)|NO||Data column|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Purchasing].[ProductVendor]( 	[ProductID] [int] NOT NULL, 	[BusinessEntityID] [int] NOT NULL, 	[AverageLeadTime] [int] NOT NULL, 	[StandardPrice] [money] NOT NULL, 	[LastReceiptCost] [money] NULL, 	[LastReceiptDate] [datetime] NULL, 	[MinOrderQty] [int] NOT NULL, 	[MaxOrderQty] [int] NOT NULL, 	[OnOrderQty] [int] NULL, 	[UnitMeasureCode] [nchar](3) NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_ProductVendor_ProductID_BusinessEntityID] PRIMARY KEY CLUSTERED ( 	[ProductID] ASC, 	[BusinessEntityID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ProductVendor_ProductID_BusinessEntityID.

- Contains foreign keys to related tables.


### Table: `[Purchasing].[PurchaseOrderDetail]`

**Purpose:** Details of each line on a purchase order.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`PurchaseOrderID`|int|NO||Primary key identifier|
|`PurchaseOrderDetailID`|int IDENTITY|NO||Primary key identifier|
|`DueDate`|datetime|NO||Date/time|
|`OrderQty`|smallint|NO||Quantity|
|`ProductID`|int|NO||Primary key identifier|
|`UnitPrice`|money|NO||Monetary value|
|`LineTotal`|AS (isnull(OrderQty*UnitPrice,(0.00)|YES||Line number|
|`ReceivedQty`|decimal(8,|NO||Quantity|
|`RejectedQty`|decimal(8,|NO||Quantity|
|`StockedQty`|AS (isnull(ReceivedQty-RejectedQty,(0.00)|YES||Quantity|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Purchasing].[PurchaseOrderDetail]( 	[PurchaseOrderID] [int] NOT NULL, 	[PurchaseOrderDetailID] [int] IDENTITY(1,1) NOT NULL, 	[DueDate] [datetime] NOT NULL, 	[OrderQty] [smallint] NOT NULL, 	[ProductID] [int] NOT NULL, 	[UnitPrice] [money] NOT NULL, 	[LineTotal]  AS (isnull([OrderQty]*[UnitPrice],(0.00))), 	[ReceivedQty] [decimal](8, 2) NOT NULL, 	[RejectedQty] [decimal](8, 2) NOT NULL, 	[StockedQty]  AS (isnull([ReceivedQty]-[RejectedQty],(0.00))), 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_PurchaseOrderDetail_PurchaseOrderID_PurchaseOrderDetailID] PRIMARY KEY CLUSTERED ( 	[PurchaseOrderID] ASC, 	[PurchaseOrderDetailID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_PurchaseOrderDetail_PurchaseOrderID_PurchaseOrderDetailID.

- `LineTotal` is a computed column.

- `StockedQty` is a computed column.

- Contains foreign keys to related tables.


### Table: `[Purchasing].[PurchaseOrderHeader]`

**Purpose:** Top‑level purchase order header.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`PurchaseOrderID`|int IDENTITY|NO||Primary key identifier|
|`RevisionNumber`|tinyint|NO||Data column|
|`Status`|tinyint|NO||Data column|
|`EmployeeID`|int|NO||Foreign key reference|
|`VendorID`|int|NO||Primary key identifier|
|`ShipMethodID`|int|NO||Foreign key reference|
|`OrderDate`|datetime|NO||Date/time|
|`ShipDate`|datetime|YES||Date/time|
|`SubTotal`|money|NO||Data column|
|`TaxAmt`|money|NO||Data column|
|`Freight`|money|NO||Data column|
|`TotalDue`|AS (isnull((SubTotal+TaxAmt)|NO||Data column|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Purchasing].[PurchaseOrderHeader]( 	[PurchaseOrderID] [int] IDENTITY(1,1) NOT NULL, 	[RevisionNumber] [tinyint] NOT NULL, 	[Status] [tinyint] NOT NULL, 	[EmployeeID] [int] NOT NULL, 	[VendorID] [int] NOT NULL, 	[ShipMethodID] [int] NOT NULL, 	[OrderDate] [datetime] NOT NULL, 	[ShipDate] [datetime] NULL, 	[SubTotal] [money] NOT NULL, 	[TaxAmt] [money] NOT NULL, 	[Freight] [money] NOT NULL, 	[TotalDue]  AS (isnull(([SubTotal]+[TaxAmt])+[Freight],(0))) PERSISTED NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_PurchaseOrderHeader_PurchaseOrderID] PRIMARY KEY CLUSTERED ( 	[PurchaseOrderID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_PurchaseOrderHeader_PurchaseOrderID.

- `TotalDue` is a computed column.

- Contains foreign keys to related tables.


### Table: `[Purchasing].[ShipMethod]`

**Purpose:** Available shipping methods.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ShipMethodID`|int IDENTITY|NO||Primary key identifier|
|`Name`|dbo.Name|NO||Descriptive name|
|`ShipBase`|money|NO||Data column|
|`ShipRate`|money|NO||Monetary value|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Purchasing].[ShipMethod]( 	[ShipMethodID] [int] IDENTITY(1,1) NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[ShipBase] [money] NOT NULL, 	[ShipRate] [money] NOT NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_ShipMethod_ShipMethodID] PRIMARY KEY CLUSTERED ( 	[ShipMethodID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ShipMethod_ShipMethodID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


## Sales

### Table: `[Sales].[Customer]`

**Purpose:** Customer accounts (individual or store).

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`CustomerID`|int IDENTITY|NO||Primary key identifier|
|`PersonID`|int|YES||Foreign key reference|
|`StoreID`|int|YES||Foreign key reference|
|`TerritoryID`|int|YES||Foreign key reference|
|`AccountNumber`|AS (isnull('AW'+dbo.ufnLeadingZeros(CustomerID)|YES||Data column|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[Customer]( 	[CustomerID] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL, 	[PersonID] [int] NULL, 	[StoreID] [int] NULL, 	[TerritoryID] [int] NULL, 	[AccountNumber]  AS (isnull('AW'+[dbo].[ufnLeadingZeros]([CustomerID]),'')), 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_Customer_CustomerID] PRIMARY KEY CLUSTERED ( 	[CustomerID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_Customer_CustomerID.

- Contains `rowguid` column for unique replication identifiers.

- `AccountNumber` is a computed column.

- Contains foreign keys to related tables.


### Table: `[Sales].[SalesTerritory]`

**Purpose:** Sales territories by region.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`TerritoryID`|int IDENTITY|NO||Foreign key reference|
|`Name`|dbo.Name|NO||Descriptive name|
|`CountryRegionCode`|nvarchar(3)|NO||Data column|
|`Group`|nvarchar(50)|NO||Data column|
|`SalesYTD`|money|NO||Data column|
|`SalesLastYear`|money|NO||Data column|
|`CostYTD`|money|NO||Monetary value|
|`CostLastYear`|money|NO||Monetary value|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[SalesTerritory]( 	[TerritoryID] [int] IDENTITY(1,1) NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[CountryRegionCode] [nvarchar](3) NOT NULL, 	[Group] [nvarchar](50) NOT NULL, 	[SalesYTD] [money] NOT NULL, 	[SalesLastYear] [money] NOT NULL, 	[CostYTD] [money] NOT NULL, 	[CostLastYear] [money] NOT NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_SalesTerritory_TerritoryID] PRIMARY KEY CLUSTERED ( 	[TerritoryID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_SalesTerritory_TerritoryID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


### Table: `[Sales].[SalesPerson]`

**Purpose:** Sales person assignments and performance metrics.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`BusinessEntityID`|int|NO||Primary key identifier|
|`TerritoryID`|int|YES||Foreign key reference|
|`SalesQuota`|money|YES||Data column|
|`Bonus`|money|NO||Data column|
|`CommissionPct`|smallmoney|NO||Data column|
|`SalesYTD`|money|NO||Data column|
|`SalesLastYear`|money|NO||Data column|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[SalesPerson]( 	[BusinessEntityID] [int] NOT NULL, 	[TerritoryID] [int] NULL, 	[SalesQuota] [money] NULL, 	[Bonus] [money] NOT NULL, 	[CommissionPct] [smallmoney] NOT NULL, 	[SalesYTD] [money] NOT NULL, 	[SalesLastYear] [money] NOT NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_SalesPerson_BusinessEntityID] PRIMARY KEY CLUSTERED ( 	[BusinessEntityID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_SalesPerson_BusinessEntityID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


### Table: `[Sales].[SalesOrderHeader]`

**Purpose:** Top‑level sales order header.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`SalesOrderID`|int IDENTITY|NO||Primary key identifier|
|`RevisionNumber`|tinyint|NO||Data column|
|`OrderDate`|datetime|NO||Date/time|
|`DueDate`|datetime|NO||Date/time|
|`ShipDate`|datetime|YES||Date/time|
|`Status`|tinyint|NO||Data column|
|`OnlineOrderFlag`|dbo.Flag|NO||Boolean flag|
|`SalesOrderNumber`|AS (isnull(N'SO'+CONVERT(nvarchar(23)|YES||Data column|
|`PurchaseOrderNumber`|dbo.OrderNumber|YES||Data column|
|`AccountNumber`|dbo.AccountNumber|YES||Data column|
|`CustomerID`|int|NO||Foreign key reference|
|`SalesPersonID`|int|YES||Foreign key reference|
|`TerritoryID`|int|YES||Foreign key reference|
|`BillToAddressID`|int|NO||Foreign key reference|
|`ShipToAddressID`|int|NO||Foreign key reference|
|`ShipMethodID`|int|NO||Foreign key reference|
|`CreditCardID`|int|YES||Primary key identifier|
|`CreditCardApprovalCode`|varchar(15)|YES||Data column|
|`CurrencyRateID`|int|YES||Foreign key reference|
|`SubTotal`|money|NO||Data column|
|`TaxAmt`|money|NO||Data column|
|`Freight`|money|NO||Data column|
|`TotalDue`|AS (isnull((SubTotal+TaxAmt)|YES||Data column|
|`Comment`|nvarchar(128)|YES||Data column|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[SalesOrderHeader]( 	[SalesOrderID] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL, 	[RevisionNumber] [tinyint] NOT NULL, 	[OrderDate] [datetime] NOT NULL, 	[DueDate] [datetime] NOT NULL, 	[ShipDate] [datetime] NULL, 	[Status] [tinyint] NOT NULL, 	[OnlineOrderFlag] [dbo].[Flag] NOT NULL, 	[SalesOrderNumber]  AS (isnull(N'SO'+CONVERT([nvarchar](23),[SalesOrderID]),N'*** ERROR ***')), 	[PurchaseOrderNumber] [dbo].[OrderNumber] NULL, 	[AccountNumber] [dbo].[AccountNumber] NULL, 	[CustomerID] [int] NOT NULL, 	[SalesPersonID] [int] NULL, 	[TerritoryID] [int] NULL, 	[BillToAddressID] [int] NOT NULL, 	[ShipToAddressID] [int] NOT NULL, 	[ShipMethodID] [int] NOT NULL, 	[CreditCardID] [int] NULL, 	[CreditCardApprovalCode] [varchar](15) NULL, 	[CurrencyRateID] [int] NULL, 	[SubTotal] [money] NOT NULL, 	[TaxAmt] [money] NOT NULL, 	[Freight] [money] NOT NULL, 	[TotalDue]  AS (isnull(([SubTotal]+[TaxAmt])+[Freight],(0))), 	[Comment] [nvarchar](128) NULL, ...`

**Notes**

- Primary key on PK_SalesOrderHeader_SalesOrderID.

- Contains `rowguid` column for unique replication identifiers.

- `SalesOrderNumber` is a computed column.

- `TotalDue` is a computed column.

- Contains foreign keys to related tables.


### Table: `[Sales].[Store]`

**Purpose:** Stores or retailers acting as customers.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`BusinessEntityID`|int|NO||Primary key identifier|
|`Name`|dbo.Name|NO||Descriptive name|
|`SalesPersonID`|int|YES||Foreign key reference|
|`Demographics`|xml(CONTENT|YES||Data column|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[Store]( 	[BusinessEntityID] [int] NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[SalesPersonID] [int] NULL, 	[Demographics] [xml](CONTENT [Sales].[StoreSurveySchemaCollection]) NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_Store_BusinessEntityID] PRIMARY KEY CLUSTERED ( 	[BusinessEntityID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_Store_BusinessEntityID.

- Contains `rowguid` column for unique replication identifiers.

- Column `Demographics` stores XML data.

- Contains foreign keys to related tables.


### Table: `[Sales].[CountryRegionCurrency]`

**Purpose:** Maps countries to currencies.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`CountryRegionCode`|nvarchar(3)|NO||Data column|
|`CurrencyCode`|nchar(3)|NO||Data column|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[CountryRegionCurrency]( 	[CountryRegionCode] [nvarchar](3) NOT NULL, 	[CurrencyCode] [nchar](3) NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_CountryRegionCurrency_CountryRegionCode_CurrencyCode] PRIMARY KEY CLUSTERED ( 	[CountryRegionCode] ASC, 	[CurrencyCode] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_CountryRegionCurrency_CountryRegionCode_CurrencyCode.


### Table: `[Sales].[CreditCard]`

**Purpose:** Credit card details used by customers.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`CreditCardID`|int IDENTITY|NO||Primary key identifier|
|`CardType`|nvarchar(50)|NO||Data column|
|`CardNumber`|nvarchar(25)|NO||Data column|
|`ExpMonth`|tinyint|NO||Data column|
|`ExpYear`|smallint|NO||Data column|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[CreditCard]( 	[CreditCardID] [int] IDENTITY(1,1) NOT NULL, 	[CardType] [nvarchar](50) NOT NULL, 	[CardNumber] [nvarchar](25) NOT NULL, 	[ExpMonth] [tinyint] NOT NULL, 	[ExpYear] [smallint] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_CreditCard_CreditCardID] PRIMARY KEY CLUSTERED ( 	[CreditCardID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_CreditCard_CreditCardID.


### Table: `[Sales].[Currency]`

**Purpose:** Currency codes.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`CurrencyCode`|nchar(3)|NO||Data column|
|`Name`|dbo.Name|NO||Descriptive name|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[Currency]( 	[CurrencyCode] [nchar](3) NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_Currency_CurrencyCode] PRIMARY KEY CLUSTERED ( 	[CurrencyCode] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_Currency_CurrencyCode.


### Table: `[Sales].[CurrencyRate]`

**Purpose:** Historical currency exchange rates.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`CurrencyRateID`|int IDENTITY|NO||Primary key identifier|
|`CurrencyRateDate`|datetime|NO||Date/time|
|`FromCurrencyCode`|nchar(3)|NO||Data column|
|`ToCurrencyCode`|nchar(3)|NO||Data column|
|`AverageRate`|money|NO||Monetary value|
|`EndOfDayRate`|money|NO||Monetary value|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[CurrencyRate]( 	[CurrencyRateID] [int] IDENTITY(1,1) NOT NULL, 	[CurrencyRateDate] [datetime] NOT NULL, 	[FromCurrencyCode] [nchar](3) NOT NULL, 	[ToCurrencyCode] [nchar](3) NOT NULL, 	[AverageRate] [money] NOT NULL, 	[EndOfDayRate] [money] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_CurrencyRate_CurrencyRateID] PRIMARY KEY CLUSTERED ( 	[CurrencyRateID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_CurrencyRate_CurrencyRateID.


### Table: `[Sales].[PersonCreditCard]`

**Purpose:** Associates people with their credit cards.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`BusinessEntityID`|int|NO||Primary key identifier|
|`CreditCardID`|int|NO||Primary key identifier|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[PersonCreditCard]( 	[BusinessEntityID] [int] NOT NULL, 	[CreditCardID] [int] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_PersonCreditCard_BusinessEntityID_CreditCardID] PRIMARY KEY CLUSTERED ( 	[BusinessEntityID] ASC, 	[CreditCardID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_PersonCreditCard_BusinessEntityID_CreditCardID.

- Contains foreign keys to related tables.


### Table: `[Sales].[SalesOrderDetail]`

**Purpose:** Line items for sales orders.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`SalesOrderID`|int|NO||Primary key identifier|
|`SalesOrderDetailID`|int IDENTITY|NO||Primary key identifier|
|`CarrierTrackingNumber`|nvarchar(25)|YES||Data column|
|`OrderQty`|smallint|NO||Quantity|
|`ProductID`|int|NO||Primary key identifier|
|`SpecialOfferID`|int|NO||Foreign key reference|
|`UnitPrice`|money|NO||Monetary value|
|`UnitPriceDiscount`|money|NO||Monetary value|
|`LineTotal`|AS (isnull((UnitPrice*((1.0)|YES||Line number|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[SalesOrderDetail]( 	[SalesOrderID] [int] NOT NULL, 	[SalesOrderDetailID] [int] IDENTITY(1,1) NOT NULL, 	[CarrierTrackingNumber] [nvarchar](25) NULL, 	[OrderQty] [smallint] NOT NULL, 	[ProductID] [int] NOT NULL, 	[SpecialOfferID] [int] NOT NULL, 	[UnitPrice] [money] NOT NULL, 	[UnitPriceDiscount] [money] NOT NULL, 	[LineTotal]  AS (isnull(([UnitPrice]*((1.0)-[UnitPriceDiscount]))*[OrderQty],(0.0))), 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_SalesOrderDetail_SalesOrderID_SalesOrderDetailID] PRIMARY KEY CLUSTERED ( 	[SalesOrderID] ASC, 	[SalesOrderDetailID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_SalesOrderDetail_SalesOrderID_SalesOrderDetailID.

- Contains `rowguid` column for unique replication identifiers.

- `LineTotal` is a computed column.

- Contains foreign keys to related tables.


### Table: `[Sales].[SalesOrderHeaderSalesReason]`

**Purpose:** Junction table linking orders with reasons.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`SalesOrderID`|int|NO||Primary key identifier|
|`SalesReasonID`|int|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[SalesOrderHeaderSalesReason]( 	[SalesOrderID] [int] NOT NULL, 	[SalesReasonID] [int] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_SalesOrderHeaderSalesReason_SalesOrderID_SalesReasonID] PRIMARY KEY CLUSTERED ( 	[SalesOrderID] ASC, 	[SalesReasonID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_SalesOrderHeaderSalesReason_SalesOrderID_SalesReasonID.

- Contains foreign keys to related tables.


### Table: `[Sales].[SalesPersonQuotaHistory]`

**Purpose:** Historical sales quotas for sales persons.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`BusinessEntityID`|int|NO||Primary key identifier|
|`QuotaDate`|datetime|NO||Date/time|
|`SalesQuota`|money|NO||Data column|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[SalesPersonQuotaHistory]( 	[BusinessEntityID] [int] NOT NULL, 	[QuotaDate] [datetime] NOT NULL, 	[SalesQuota] [money] NOT NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_SalesPersonQuotaHistory_BusinessEntityID_QuotaDate] PRIMARY KEY CLUSTERED ( 	[BusinessEntityID] ASC, 	[QuotaDate] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_SalesPersonQuotaHistory_BusinessEntityID_QuotaDate.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


### Table: `[Sales].[SalesReason]`

**Purpose:** Reasons driving sales.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`SalesReasonID`|int IDENTITY|NO||Primary key identifier|
|`Name`|dbo.Name|NO||Descriptive name|
|`ReasonType`|dbo.Name|NO||Reason|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[SalesReason]( 	[SalesReasonID] [int] IDENTITY(1,1) NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[ReasonType] [dbo].[Name] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_SalesReason_SalesReasonID] PRIMARY KEY CLUSTERED ( 	[SalesReasonID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_SalesReason_SalesReasonID.


### Table: `[Sales].[SalesTaxRate]`

**Purpose:** Sales tax rates by location.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`SalesTaxRateID`|int IDENTITY|NO||Primary key identifier|
|`StateProvinceID`|int|NO||Foreign key reference|
|`TaxType`|tinyint|NO||Data column|
|`TaxRate`|smallmoney|NO||Monetary value|
|`Name`|dbo.Name|NO||Descriptive name|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[SalesTaxRate]( 	[SalesTaxRateID] [int] IDENTITY(1,1) NOT NULL, 	[StateProvinceID] [int] NOT NULL, 	[TaxType] [tinyint] NOT NULL, 	[TaxRate] [smallmoney] NOT NULL, 	[Name] [dbo].[Name] NOT NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_SalesTaxRate_SalesTaxRateID] PRIMARY KEY CLUSTERED ( 	[SalesTaxRateID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_SalesTaxRate_SalesTaxRateID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


### Table: `[Sales].[SalesTerritoryHistory]`

**Purpose:** History of sales territory assignments to sales persons.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`BusinessEntityID`|int|NO||Primary key identifier|
|`TerritoryID`|int|NO||Foreign key reference|
|`StartDate`|datetime|NO||Date/time|
|`EndDate`|datetime|YES||Date/time|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[SalesTerritoryHistory]( 	[BusinessEntityID] [int] NOT NULL, 	[TerritoryID] [int] NOT NULL, 	[StartDate] [datetime] NOT NULL, 	[EndDate] [datetime] NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_SalesTerritoryHistory_BusinessEntityID_StartDate_TerritoryID] PRIMARY KEY CLUSTERED ( 	[BusinessEntityID] ASC, 	[StartDate] ASC, 	[TerritoryID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_SalesTerritoryHistory_BusinessEntityID_StartDate_TerritoryID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


### Table: `[Sales].[ShoppingCartItem]`

**Purpose:** Shopping cart items for prospective orders.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ShoppingCartItemID`|int IDENTITY|NO||Primary key identifier|
|`ShoppingCartID`|nvarchar(50)|NO||Foreign key reference|
|`Quantity`|int|NO||Quantity|
|`ProductID`|int|NO||Primary key identifier|
|`DateCreated`|datetime|NO||Date/time|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[ShoppingCartItem]( 	[ShoppingCartItemID] [int] IDENTITY(1,1) NOT NULL, 	[ShoppingCartID] [nvarchar](50) NOT NULL, 	[Quantity] [int] NOT NULL, 	[ProductID] [int] NOT NULL, 	[DateCreated] [datetime] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_ShoppingCartItem_ShoppingCartItemID] PRIMARY KEY CLUSTERED ( 	[ShoppingCartItemID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ShoppingCartItem_ShoppingCartItemID.

- Contains foreign keys to related tables.


### Table: `[Sales].[SpecialOffer]`

**Purpose:** Marketing promotions and special offers.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`SpecialOfferID`|int IDENTITY|NO||Primary key identifier|
|`Description`|nvarchar(255)|NO||Description|
|`DiscountPct`|smallmoney|NO||Data column|
|`Type`|nvarchar(50)|NO||Data column|
|`Category`|nvarchar(50)|NO||Data column|
|`StartDate`|datetime|NO||Date/time|
|`EndDate`|datetime|NO||Date/time|
|`MinQty`|int|NO||Quantity|
|`MaxQty`|int|YES||Quantity|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[SpecialOffer]( 	[SpecialOfferID] [int] IDENTITY(1,1) NOT NULL, 	[Description] [nvarchar](255) NOT NULL, 	[DiscountPct] [smallmoney] NOT NULL, 	[Type] [nvarchar](50) NOT NULL, 	[Category] [nvarchar](50) NOT NULL, 	[StartDate] [datetime] NOT NULL, 	[EndDate] [datetime] NOT NULL, 	[MinQty] [int] NOT NULL, 	[MaxQty] [int] NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_SpecialOffer_SpecialOfferID] PRIMARY KEY CLUSTERED ( 	[SpecialOfferID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_SpecialOffer_SpecialOfferID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


### Table: `[Sales].[SpecialOfferProduct]`

**Purpose:** Associates special offers with products.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`SpecialOfferID`|int|NO||Foreign key reference|
|`ProductID`|int|NO||Primary key identifier|
|`rowguid`|uniqueidentifier|NO||Foreign key reference|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [Sales].[SpecialOfferProduct]( 	[SpecialOfferID] [int] NOT NULL, 	[ProductID] [int] NOT NULL, 	[rowguid] [uniqueidentifier] ROWGUIDCOL  NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_SpecialOfferProduct_SpecialOfferID_ProductID] PRIMARY KEY CLUSTERED ( 	[SpecialOfferID] ASC, 	[ProductID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_SpecialOfferProduct_SpecialOfferID_ProductID.

- Contains `rowguid` column for unique replication identifiers.

- Contains foreign keys to related tables.


## System/Audit

### Table: `[dbo].[AWBuildVersion]`

**Purpose:** Tracks database build version information.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`SystemInformationID`|tinyint IDENTITY|NO||Foreign key reference|
|`Database Version`|nvarchar(25)|NO||Data column|
|`VersionDate`|datetime|NO||Date/time|
|`ModifiedDate`|datetime|NO||Date/time|

**Schema**

`CREATE TABLE [dbo].[AWBuildVersion]( 	[SystemInformationID] [tinyint] IDENTITY(1,1) NOT NULL, 	[Database Version] [nvarchar](25) NOT NULL, 	[VersionDate] [datetime] NOT NULL, 	[ModifiedDate] [datetime] NOT NULL,  CONSTRAINT [PK_AWBuildVersion_SystemInformationID] PRIMARY KEY CLUSTERED ( 	[SystemInformationID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_AWBuildVersion_SystemInformationID.

- Contains foreign keys to related tables.


### Table: `[dbo].[DatabaseLog]`

**Purpose:** Logs DDL changes captured by database trigger.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`DatabaseLogID`|int IDENTITY|NO||Primary key identifier|
|`PostTime`|datetime|NO||Data column|
|`DatabaseUser`|sysname|NO||Data column|
|`Event`|sysname|NO||Data column|
|`Schema`|sysname|YES||Data column|
|`Object`|sysname|YES||Data column|
|`TSQL`|nvarchar(max)|NO||Data column|
|`XmlEvent`|xml|NO||Data column|

**Schema**

`CREATE TABLE [dbo].[DatabaseLog]( 	[DatabaseLogID] [int] IDENTITY(1,1) NOT NULL, 	[PostTime] [datetime] NOT NULL, 	[DatabaseUser] [sysname] NOT NULL, 	[Event] [sysname] NOT NULL, 	[Schema] [sysname] NULL, 	[Object] [sysname] NULL, 	[TSQL] [nvarchar](max) NOT NULL, 	[XmlEvent] [xml] NOT NULL,  CONSTRAINT [PK_DatabaseLog_DatabaseLogID] PRIMARY KEY NONCLUSTERED ( 	[DatabaseLogID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_DatabaseLog_DatabaseLogID.

- Column `XmlEvent` stores XML data.


### Table: `[dbo].[ErrorLog]`

**Purpose:** Logs application error messages.

|Column Name|Data Type|Nullable|Default Value|Description|
|---|---|---|---|---|
|`ErrorLogID`|int IDENTITY|NO||Primary key identifier|
|`ErrorTime`|datetime|NO||Data column|
|`UserName`|sysname|NO||Descriptive name|
|`ErrorNumber`|int|NO||Data column|
|`ErrorSeverity`|int|YES||Data column|
|`ErrorState`|int|YES||Data column|
|`ErrorProcedure`|nvarchar(126)|YES||Data column|
|`ErrorLine`|int|YES||Line number|
|`ErrorMessage`|nvarchar(4000)|NO||Data column|

**Schema**

`CREATE TABLE [dbo].[ErrorLog]( 	[ErrorLogID] [int] IDENTITY(1,1) NOT NULL, 	[ErrorTime] [datetime] NOT NULL, 	[UserName] [sysname] NOT NULL, 	[ErrorNumber] [int] NOT NULL, 	[ErrorSeverity] [int] NULL, 	[ErrorState] [int] NULL, 	[ErrorProcedure] [nvarchar](126) NULL, 	[ErrorLine] [int] NULL, 	[ErrorMessage] [nvarchar](4000) NOT NULL,  CONSTRAINT [PK_ErrorLog_ErrorLogID] PRIMARY KEY CLUSTERED ( 	[ErrorLogID] ASC )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]`

**Notes**

- Primary key on PK_ErrorLog_ErrorLogID.


## Embedded Business Logic

### Stored Procedures

- **`dbo.uspGetBillOfMaterials`** – Returns the bill of materials for a product assembly.

- **`dbo.uspGetEmployeeManagers`** – Returns managers above a given employee.

- **`dbo.uspGetManagerEmployees`** – Returns employees reporting to a manager.

- **`dbo.uspGetWhereUsedProductID`** – Lists products that directly or indirectly use the specified component.

- **`dbo.uspLogError`** – Writes error information to the `dbo.ErrorLog` table.

- **`dbo.uspPrintError`** – Returns error information for the last executed statement.

- **`dbo.uspSearchCandidateResumes`** – Performs full‑text search on candidate resumes.

- **`HumanResources.uspUpdateEmployeeHireInfo`** – Updates an employee’s hire date, job title, and salary.

- **`HumanResources.uspUpdateEmployeeLogin`** – Changes employee login credentials.

- **`HumanResources.uspUpdateEmployeePersonalInfo`** – Updates personal demographic details for an employee.


### Functions

- **`dbo.ufnGetAccountingEndDate`** – Returns the end date of the accounting period for a given date.

- **`dbo.ufnGetAccountingStartDate`** – Returns the start date of the accounting period for a given date.

- **`dbo.ufnGetContactInformation`** – Returns formatted contact information for a person.

- **`dbo.ufnGetDocumentStatusText`** – Converts document status codes to human‑readable text.

- **`dbo.ufnGetProductDealerPrice`** – Returns the dealer price of a product on a specific order date.

- **`dbo.ufnGetProductListPrice`** – Returns the list price of a product on a specific date.

- **`dbo.ufnGetProductStandardCost`** – Returns the standard cost of a product on a specific date.

- **`dbo.ufnGetPurchaseOrderStatusText`** – Converts purchase order status codes to text.

- **`dbo.ufnGetSalesOrderStatusText`** – Converts sales order status codes to text.

- **`dbo.ufnGetStock`** – Returns the current stock quantity for a product.

- **`dbo.ufnLeadingZeros`** – Pads a numeric value with leading zeros.


### Views

- **`Person.vAdditionalContactInfo`** – Returns additional contact information for people from XML columns.

- **`HumanResources.vEmployee`** – Displays employees with names and job titles.

- **`HumanResources.vEmployeeDepartment`** – Lists employees and their current departments.

- **`HumanResources.vEmployeeDepartmentHistory`** – Shows department history for employees.

- **`Sales.vIndividualCustomer`** – Shows customers that are individuals, joining Person and Customer tables.

- **`Sales.vPersonDemographics`** – Exposes demographic data stored in XML as relational columns.

- **`HumanResources.vJobCandidate`** – Flattened view of job candidate details.

- **`HumanResources.vJobCandidateEmployment`** – Extracts employment history from candidate resumes.

- **`HumanResources.vJobCandidateEducation`** – Extracts education history from candidate resumes.

- **`Production.vProductAndDescription`** – Displays products and their descriptions in multiple languages.

- **`Production.vProductModelCatalogDescription`** – XML catalog descriptions for product models.

- **`Production.vProductModelInstructions`** – Manufacturing instructions extracted from XML.

- **`Sales.vSalesPerson`** – Consolidates sales person information including quotas and territory.

- **`Sales.vSalesPersonSalesByFiscalYears`** – Returns total sales by sales person across fiscal years.

- **`Person.vStateProvinceCountryRegion`** – Joins state/province with country/region names.

- **`Sales.vStoreWithDemographics`** – Shows stores along with demographic survey data from XML.

- **`Sales.vStoreWithContacts`** – Stores and their contacts.

- **`Sales.vStoreWithAddresses`** – Stores and their addresses.

- **`Purchasing.vVendorWithContacts`** – Vendors with their contacts.

- **`Purchasing.vVendorWithAddresses`** – Vendors with their addresses.


### Triggers

- **`ddlDatabaseTriggerLog`** – AFTER DDL trigger on DATABASE level that Captures DDL events and inserts records into `dbo.DatabaseLog`.


### Checks & Complex Constraints

- Many tables enforce referential integrity through `FOREIGN KEY` constraints defined after table creation. These keys link IDs such as `BusinessEntityID`, `ProductID`, `CustomerID` and others to their parent tables.

- `CHECK` constraints enforce valid date ranges (e.g., `SellEndDate` ≥ `SellStartDate`), positive quantities, and restrict status or type columns to enumerated values.

- Computed columns (e.g., `LineTotal`, `TotalDue`, `StockedQty`) calculate values from other columns and are stored as read‑only expressions.

- Columns with the `ROWGUIDCOL` attribute (usually named `rowguid`) provide globally unique identifiers used in replication.

- User‑defined types (`dbo.Name`, `dbo.Flag`, `dbo.Phone`, etc.) abstract basic SQL Server types to enforce consistent lengths and semantics.


## Integration & Data Patterns

- **External integrations:** `Sales.CreditCard` and related tables integrate with payment systems by storing credit card numbers, approval codes and expiration dates. `Sales.CurrencyRate` and `Sales.CountryRegionCurrency` support internationalisation with exchange rates.

- **Serialized payloads:** Several tables use XML columns to store semi‑structured data. Examples include `Person.Person` (`AdditionalContactInfo`, `Demographics`), `HumanResources.JobCandidate` (`Resume`), `Production.ProductModel` (catalog descriptions and manufacturing instructions), and `Sales.Store` (store surveys). Views like `vPersonDemographics`, `vProductModelInstructions`, and `vStoreWithDemographics` extract this XML data into relational form.

- **Correlation identifiers:** Columns such as `rowguid`, `CreditCardApprovalCode`, `AccountNumber`, `SalesOrderNumber`, and `PurchaseOrderNumber` provide correlation with external systems or human‑readable identifiers.

- **Audit/Log footprint:** The database uses `dbo.DatabaseLog` to record DDL events captured by the `ddlDatabaseTriggerLog` trigger. Application errors are stored in `dbo.ErrorLog` with stack and procedure information. `dbo.AWBuildVersion` records the version of the database build.

- **Staging/ETL tables:** There are no dedicated staging tables, but historical tables like `Production.TransactionHistoryArchive` and `Sales.SalesTerritoryHistory` allow replay or audit of past activities.


## Summary

|Schema|Number of Tables|
|---|---|
|Person|13|
|HumanResources|6|
|Sales|19|
|Production|25|
|Purchasing|5|
|dbo|3|
|Total|71|