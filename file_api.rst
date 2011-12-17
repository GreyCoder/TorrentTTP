===============================================================================
Storage API - A REST Reference
===============================================================================


REST interface for a storage engine.


Functions
===============================================================================


/
###############################################################################


Verbs
-------------------------------------------------------------------------------


GET
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Parameters
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: Auth

Type: String


Description: SHA512 hash that identifies a client session.


Key: Address

Type: String


Description: IP address of the client being authenticated.




Transactions
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Returns
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




Errors
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


401
*******************************************************************************


Missing or invalid <Auth>.


500
*******************************************************************************


Server node failiure.




POST
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Parameters
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: Auth

Type: String


Description: SHA512 that identifies a client




Transactions
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Returns
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: Auth

Type: String


Description: SHA512 that identifies a new client session.




Errors
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


401
*******************************************************************************


Missing or invalid <Auth>.


500
*******************************************************************************


Server node failiure.




PUT
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Parameters
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: Auth

Type: String


Description: SHA512 that identifies an active client session.


Key: Files

Type: List


Description: List of files and parts that node has.


    Key: UUID

    Type: String


    Description: UUID that represents a file.


    Key: Parts

    Type: List


    Description: List of part numbers the node has for this file.




Transactions
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Returns
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




Errors
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


400
*******************************************************************************


Missing or invalid parameters.


401
*******************************************************************************


Missing or invalid <Auth>.


500
*******************************************************************************


Server node failure




DELETE
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Parameters
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: Auth

Type: String


Description: SHA512 hash that identifies a client.


Key: Session

Type: String


Description: SHA512 hash that identifies and active client session




Transactions
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Returns
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




Errors
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


401
*******************************************************************************


Missing or invalid <Auth>.


500
*******************************************************************************


Server node failure






/Shares/
###############################################################################


Verbs
-------------------------------------------------------------------------------


GET
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Parameters
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: Auth

Type: String


Description: SHA512 hash that identifies a client.




Transactions
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Returns
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: Shares

Type: List


Description: A list of accessible shares.


    Key: UUID

    Type: String


    Description: UUID that represents the share.


    Key: Name

    Type: String


    Description: User chosen name as it is defined in the meta-data.


    Key: Write

    Type: Boolean


    Description: Indicator of whether or not the user can edit the contents of the share.




Errors
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


401
*******************************************************************************


Missing or invalid <Auth>.


500
*******************************************************************************


Server node failiure.




POST
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Parameters
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: Auth

Type: String


Description: SHA512 hash that identifies a client.


Key: Name

Type: String


Description: User chosen name for the Share.




Transactions
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Returns
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: UUID

Type: String


Description: UUID that identifies the new Share.




Errors
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


400
*******************************************************************************


Missing or invalid parameters.


401
*******************************************************************************


Missing or invalid <Auth>.


409
*******************************************************************************


Share already exists.


500
*******************************************************************************


Server node failure






/Shares/<UUID>/
###############################################################################


Verbs
-------------------------------------------------------------------------------


GET
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Parameters
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: Auth

Type: String


Description: SHA512 hash that identifies a client.




Transactions
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Returns
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: Files

Type: List


Description: A list of accessible files.


    Key: UUID

    Type: String


    Description: UUID that represents the share.


    Key: Name

    Type: String


    Description: User chosen name as it is defined in the meta-data.


    Key: User_Path

    Type: String


    Description: Path to file on original file system.


    Key: System_Path

    Type: String


    Description: Path to file on storage system.


    Key: Size

    Type: Number


    Description: Size of file in bytes


    Key: Write

    Type: Boolean


    Description: Indicator of whether or not the user can edit the contents of the share.




Errors
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


401
*******************************************************************************


Missing or invalid <Auth>.


403
*******************************************************************************


Read permission denied.


404
*******************************************************************************


Invalid share UUID.


410
*******************************************************************************


Share has been removed.


500
*******************************************************************************


Server node failiure.




PUT
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Parameters
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: Auth

Type: String


Description: SHA512 hash that identifies a client.


Key: UUID

Type: String


Description: UUID that identifies the Share.


Key: Groups

Type: JSON


Description: Object containing ACL sets for the Share.


    Key: Read

    Type: List


    Description: List of UUID's that identify groups with READ permissions on the Share.


    Key: Write

    Type: List


    Description: List of UUID's that identify groups with WRITE permissions on the Share.


Key: Users

Type: JSON


Description: Object containing ACL sets for the Share.


    Key: Read

    Type: List


    Description: List of UUID's that identify users with READ permissions on the Share.


    Key: Write

    Type: List


    Description: List of UUID's that identify users with WRITE permissions on the Share.




Transactions
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Returns
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




Errors
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


401
*******************************************************************************


Missing or invalid <Auth>.


403
*******************************************************************************


Write permission denied.


404
*******************************************************************************


Invalid share UUID.


410
*******************************************************************************


Share has been removed.


500
*******************************************************************************


Server node failiure.




DELETE
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Parameters
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: Auth

Type: String


Description: SHA512 hash that identifies a client.


Key: UUID

Type: String


Description: UUID that identifies the Share.




Transactions
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Returns
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




Errors
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


401
*******************************************************************************


Missing or invalid <Auth>.


403
*******************************************************************************


Write permission denied.


404
*******************************************************************************


Invalid share UUID.


410
*******************************************************************************


Share has been removed.


500
*******************************************************************************


Server node failiure.






/Files/
###############################################################################


Verbs
-------------------------------------------------------------------------------


GET
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Parameters
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: Auth

Type: String


Description: SHA512 hash that identifies a client.




Transactions
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Returns
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: Files

Type: List


Description: A list of all accessible files.


    Key: UUID

    Type: String


    Description: UUID that represents the share.


    Key: Name

    Type: String


    Description: User chosen name as it is defined in the meta-data.


    Key: User_Path

    Type: String


    Description: Path to file on original file system.


    Key: System_Path

    Type: String


    Description: Path to file on storage system.


    Key: Size

    Type: Number


    Description: Size of file in bytes


    Key: Write

    Type: Boolean


    Description: Indicator of whether or not the user can edit the contents of the share.




Errors
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


400
*******************************************************************************


Missing or invalid parameters.


401
*******************************************************************************


Missing or invalid <Auth>.


500
*******************************************************************************


Server node failure.




POST
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Parameters
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: Auth

Type: String


Description: SHA512 hash that identifies a client.


Key: Share

Type: String


Description: REST interface for a storage engine.


Key: Path

Type: String


Description: Relative path in which to place the new file. Ex: Documents/Business/Good_Ideas/


Key: Name

Type: String


Description: Name of the new file being created.


Key: Size

Type: Number


Description: Size of the new file in bytes.


Key: Hash

Type: String


Description: SHA512 hash that can be used to validate the file.


Key: Parts

Type: List


Description: List of SHA512 hashes that can be used to validate parts.




Transactions
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Returns
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




Errors
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


401
*******************************************************************************


Missing or invalid <Auth>.


403
*******************************************************************************


Write permission denied.


404
*******************************************************************************


Invalid Share UUID.


410
*******************************************************************************


The Share has been removed.


412
*******************************************************************************


The Share is out of allocated space.


500
*******************************************************************************


Server node failiure.






/Files/<UUID>/
###############################################################################


Verbs
-------------------------------------------------------------------------------


GET
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Parameters
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: Auth

Type: String


Description: SHA512 hash that identifies a client.


Key: Part

Type: Number


Description: Part offset used as starting point of file read operation.




Transactions
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Returns
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: NONE

Type: Binary


Description: Binary stream of 512 kb.




Errors
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


400
*******************************************************************************


Missing or invalid parameters.


401
*******************************************************************************


Missing or invalid <Auth>.


403
*******************************************************************************


Read permissions denied.


404
*******************************************************************************


Invalid File UUID.


410
*******************************************************************************


File no longer exists.


500
*******************************************************************************


Server node failure.




PUT
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Parameters
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: Auth

Type: String


Description: SHA512 hash that identifies a client.


Key: Part

Type: Number


Description: Part offset used as starting point of file write operation.


Key: Hash

Type: String


Description: SHA512 used to validate the chunk.




Transactions
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Ready
*******************************************************************************


Source: Server


Type: Number


Description: Single bytes message that indicates readiness to recieve data.


Payload
*******************************************************************************


Source: Client


Type: Binary


Description: Binary stream of 512 kb.


Returns
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




Errors
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


400
*******************************************************************************


Missing or invalid parameters.


401
*******************************************************************************


Missing or invalid <Auth>.


403
*******************************************************************************


Write permissions denied.


404
*******************************************************************************


Invalid File UUID.


410
*******************************************************************************


File no longer exists.


500
*******************************************************************************


Server node failure.




DELETE
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Parameters
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Key: Auth

Type: String


Description: SHA512 hash that identifies a client.


Key: UUID

Type: String


Description: UUID that identifies the File.




Transactions
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Returns
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




Errors
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


401
*******************************************************************************


Missing or invalid <Auth>.


403
*******************************************************************************


Write permission denied.


404
*******************************************************************************


Invalid File UUID.


410
*******************************************************************************


File has already been removed.


500
*******************************************************************************


Server node failiure.




