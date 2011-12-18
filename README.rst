===========
TorrentTTP
===========

**A distributed file transfer protocol rooted in HTTP.**

What is it?
============

TorrentTTP is a file transport protocol inspired by Bit Torrent. The idea behind distributed
file distribution isn't that complicated. Create an environment where every client is a 
server; a peer. Use a mechanism for file downloads that connects peers with other peers that 
either already have the file or are currently downloading the file. The system them downloads 
a chunk of a predefined size from one of the peers that has that chunk.

Bit Torrent builds this kind of environment by defining three core systems.

* The client application.

* The communication protocol.

* The file meta-data.

TorrentTTP attempts to redefine these standards to create a different kind of peer-to-peer
protocol. This is not meant to be a replacement to the traditional Bit Torrent protocol. This 
projects aims to modify the complete peer-to-peer protocol that Bit Torrent implements in order
to bring the good parts of distributed file distribution to an infrastructure as a service 
platform.

Buzzwords aside, TorrentTTP is created with business in mind. If you have a bank of storage that
you want to license/rent out to customers in a 'cloud storage' model then you need some kind of
protocol for securing and distributing your customers' content. This project aims to make implementing
a 'cloud storage' system as simple as deploying a web server and to make customizing the functionality
of your system as simple as using a modern web development framework.

Why not just use Bit Torrent?
==============================

As stated above, torrent is a decent enough protocol for large file distribution. The problems that 
Bit Torrent has, when applied to a business model, is that there is no *reliable* method for tracking
usage statistics such as amount of disk space used by a particular user or bandwith costs that a particular
user has incurred. This is mainly because the Bit Torrent protocol wasn't designed for a peer to maintain 
a persistent identity. 

The fact that peer activity is essentially lost any time it generates a new identity session is a very
discouraging when considering Bit Torrent in the context of Storage as a Server. Persistent identity is
an absolute requirement. 

There are other features of Bit Torrent that discourage use in a SaaS/IaaS environment that this project
intends to remedy, but none so critical as the persistent user identity.

Protocol
=========


File Transfer
---------------

File transfer takes place in regularly sized pieces. This protocol will support the initial piece 
size of 512Kb which is the average suggested size for a piece in the Bit Torrent protocol for files
as large as 10GB. This system intends to serve files larger than 10GB and testing will determine if
a more optimal piece size exists.

HTTP
#####

This design implements the use of HTTP for communication. All transactions between peers take place
in the form of HTTP request/response cycles. The purpose of using HTTP is to ease the burden of building
clients by making it possible to create TorrentTTP clients with modern web development frameworks like
CakePHP, Django, RoR, or Node.js. Modern web development frameworks usually come packaged with a rich 
set of tools for building REST interfaces and working with JSON data.

Placing this protocol within the context of web development is also intended to make it easier to create
custom additions to the base system. The freelance and small scale developers can build clients quickly without
having to dive into raw TCP socket streaming or the proprietary bencoding scheme of Bit Torrent and the large
scale or team based developers can use readily available tools to rapidly prototype and test new functionality
with 'off the shelf' technologies.

REST
#####

With removal of raw TCP streaming for communication, this project needed a standardized format for peer-to-peer
communication. HTTP helps to maintain the language agnostic communication that Bit Torrent clients utilize, but 
does little to standardize the *content* of the communication.

Rather than specify which bits of a binary stream represent meta-data or payload data, this project uses the common
REST standards for creating an outwardly accessible API. Function calls are HTTP Requests to a particular URL, 
parameters are given in the form of a JSON document, and return values are sent back as a JSON document in an
HTTP Response. This provides a language, OS, and implementation agnostic protocol for peer communication.

To see the current revision of the REST API, see the *_api.json files.

Meta-Data
---------------

Meta-Data are required to facilitate peer communication and a distributed distribution model. Bit Torrent handles
this need by packaging file meta-data in a .torrent file that is distributed. The .torrent consists of a series
of hashes used for piece validation and a listing of trackers from whom to request peer locations. 

File Validation
#################

This project removes the idea of a meta-data *file* and instead relies on the idea of a meta-data broker for 
distributing the validation hashes of a file. The broker has the responsibility of generating meta-data as 
it is requested. In this environment, peers request a piece of a given size from another peer. They would 
then request the validation hash from another peer, but not necessarily the same peer from which it received
the file piece. 

The reasoning behind this is to allow for a variable or configurable piece size so that it can be optimized to
the size of the file being transferred or the speed of the local network. The secondary purpose to the broker
model is to allow for changing meta-data which would indicate that a file has been updated and that new binaries
are available. This wouldn't provide a platform for collaborative editing of a document but it would, for example,
provide a platform of alerting members of a research team when a new set of data is available and allowing them to
option of updating their version.


Peer Tracking
###############

Traditional Bit Torrent uses the concept of a centralized peer tracker to maintain listings of who has which files
and provides a basis for peer identification through the use of PeerID/IP sets. This project removes the centralized
tracker in favour of a more distributed model.

Each peer maintains a listing of peers whom it has communicated with. In addition to peer listings, each peer also 
maintains file listings for each peer. In effect, this makes each peer a tracker for it's own subset of the peer
network. 


Authentication
---------------

As it was mentioned earlier, one of the primary reasons for not using the Bit Torrent protocol was the lack
of a persistent identity. This project solves the issue of persistent identity by implemented an authentication
and identification protocol that each peer uses when communicating with other peers.

User ID
##########

Bit Torrent uses what it calls a PeerID for identification of peers in a peer network. It makes this identification
contextually aware by combining this PeerID with the IP address of the machine that holds the PeerID. The problem 
is that PeerID's are re-rolled every time the Bit Torrent client is restarted. This project implements a persistent
user identity by augmenting, but not removing, the notion of PeerID's.

Before a peer can begin a transaction with another peer, they must both be able to identify and authenticate each
other. To do this, each peer must have a **persistent** identifier. This is implemented in this project as a UUID. Upon 
first initialization of a TorrentTTP client a UUID is rolled and stored as the persistent identifier. The first 
step in joining a peer network is registering this UUID and the below mentioned Authentication ID with other peers.
How the registration process takes place is unimportant and could be as simple as an online form or manual entry by
a trusted peer. This solves the problem of persistent *identity* in the sense that the UUID is never re-rolled and
doing so would effectively remove the peer from the peer network.

Authentication ID
######################

Maintaining a persistent *identity* is one thing but the context of a SaaS/IaaS model requires some form of *authentication*
as well; enter the Authentication ID. This is a separate UUID that is generated by the remote peer at registration time.
After registration, the remote peer will only respond when given both the User ID (Public) and the Authentication ID
(Private). In this way peers authenticate with other peers on a one-to-one level. Doing so ensures that two peers will
only communicate and carry on transactions with one another if they have a prior relationship. As it was mentioned, the
method used to create this prior relationship is not entirely important so long as the process does not expose the 
Authentication ID publicly.


Session ID
#############

Once two peers have registered with each other they can then identify and authenticate each other. However, this protocol
implements one additional security implementation. The Session ID is a third UUID that is implemented for the purpose of
creating a contextually aware authentication for data transaction.

The idea is that a peer authenticates against another peer using the User ID and Authentication ID. Upon authentication,
the remote peer rolls a Session ID in the form of UUID that is paired with the IP address of the requesting peer. This
combination of Session ID and IP address form the basis for authentication in the context of data transfer. Using this
context aware form of authentication, peers have one additional parameter with which to prevent an unwanted distribution
of data. If a peer submits an active Session ID but does not have a matching IP address then the connection is severed.

This may seem like an unnecessary step, and when using this protocol in a **purely** peer-to-peer fashion it is step that
does not add to the security of the authentication. After all, sending a Session ID is, more or less, the same thing as 
sending a User ID and Authentication ID when considering two peer nodes authenticating against each other. This additional
step doesn't come into play until you bring in the idea of Trust Brokers (below).



Service Brokers
----------------

Throughout this brief, the notion of brokers has been mentioned several times. In this document, the term broker refers to
a trusted agent that controls the flow information. As an example, if a GET request is submitted to a peer and that peer responds 
with a listing of files that it contains then it is acting as a file broker for itself. If that peer also responds 
with file information for other peers then it is acting as a file broker for a peer network. The concept is not a
complicated one. A broker manages information. The broker role allows this peer-to-peer protocol to become more centralized
as needed in the environment by relying on specific peers within the peer network to provide functionality that would,
otherwise, be provided by all peers. In other words, a broker is a trusted peer that can be relied on to provide the singular
truth when given any request.

File Broker
###############

A File Broker is a peer that is trusted to always provide an accurate, and secure, data stream when it receives a request 
to store or transmit a file piece. In a pure peer-to-peer model, peers would download from any other authenticated peer that had 
the file piece being requested. Is a SaaS/IaaS model, this not always the desired behaviour. Establishing a trusted File Broker 
is essentially creating a dedicated peer and will always be used for file operation. Trusted File Broker peers will always be
first for piece submission or request. File Brokers are identified through a Trust Broker (below). If no Trust Broker is defined,
then the standard peer-to-peer method for retrieving file data is performed.

Meta-Data Broker
##################

A Meta-Data Broker is a peer that is trusted to always provide the most current and correct meta-data. Meta-Data in this context
meaning hash validation of file content and the maintenance of file listings for peers on a network. If, for example, a peer 
submits a GET request for a file and retrieves a piece of that file, that peer must then validate the binary data received. To 
do this it needs to match the hash value of the binary stream against a hash value that is known to accurately represent that 
piece. In a pure peer-to-peer environment, it could submit a request for the hash against any peer known to have a matching 
file piece. In a brokered model, the peer would have a listing of trusted Meta-Data Brokers that it would contact for that hash. 
In terms of a SaaS/IaaS model, these would consist of dedicated peers under the control of the service provider. Using the 
Meta-Data Broker model assures that no malicious peers are dealing false hash values. Meta-Data Brokers are identified through 
a Trust Broker. If no Trust Broker is defined, then the standard peer-to-peer method for retrieving validation hashes is performed.


Trust Broker
###############

In all cases peers are forming networks with other peers. In a SaaS/IaaS model, however, all peers are subscribing to a service
through a shared, trusted third party. In this context, the shared third party is known to be a stable and trusted peer or peer
network. Using this fact, peers joining the network can leverage their trust in the third party by accepting listings of trusted
Service Brokers. This allows a service provider to have greater control over which peers accept and distribute files or meta-data.
This is similar to what a private tracker does for the Bit Torrent protocol with the exception that Trust Brokers also act as the 
ultimate authentication authority. Earlier, the idea of Session ID's was presented. As it was stated, a strict peer-to-peer 
environment has no need for the Session ID. Working from a SaaS/IaaS model, however, is made more secure through this process.

Trust Brokers carry the burden of determining both who can be authenticated and who can perform authentication. This can be done
through two different methods.

The Inner Circle
^^^^^^^^^^^^^^^^^^^^^

The more centralized model for Trust Broker based authentication of peers in a peer network is to define the Trust Brokers as the only
available authentication providers. In this model, all peers register with the Trust Broker network and receive a Session ID that 
identifies the peer on the Trust Broker network. Then any time that peer makes a request of any kind to any peer in the Trust Broker
network the Session ID is forwarded back to the Trust Broker authority for validation. The peer handling the request relies on it's
trust in the Trust Broker to provide a correct and true response for validation. Using this process ensures that the only information
transmitted between peers in a peer network is a temporary Session ID that requires the context of IP address to remain valid. The only
time a peer transmits its User ID and Authentication ID is when it communicates with the Trust Broker.


Trust Bubbles
^^^^^^^^^^^^^^^^

Depending on the environment, the centralized model could introduce a fairly significant amount of latency in communication. Particularly,
when two peers can communicate with each other faster than they can communicate with the Trust Broker. Any time these two peers want to 
communicate, that request is first forwarded to the Trust Broker. This means all communication between peers is a four point process. To
compensate for this fact, the Trust Broker can be used to create trusted peer networks that are capable of authenticating each other.

In this model, all peers still rely on the Trust Broker for initial communication and Session ID generation. Once a peer has received a
Session ID it can then notify the Trust Broker that it also trusts a peer or peer network by sending a list of User ID's that identify
the trusted peers. This enables the trust broker to then distribute the peer's Session ID and IP information used for authentication to
the peer or peers in the list of trust. By using this method, peers that exist in a trusted sub-net can authenticate and communicate with
each other while still proxying authentication requests for untrusted peers to the Trust Broker.


License
========

All components, unless otherwise stated, are released under the GPL V3 license. For use 
of this package in proprietary or closed-source products, contact the original copyright holder.

Contributors
==============

All contributions are considered an acceptance of the included contributors agreement.
