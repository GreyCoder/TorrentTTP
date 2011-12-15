===========
TorrentTTP
===========

What is it?
============

TorrentTTP is a file transport protocol inspired by BitTorrent. 

Why not just use BitTorrent?
=============================

BitTorrent does a lot of things well. TorrentTTP is not meant as a replacement for the BitTorrent protocol. It
is simply an alternative.

Raw TCP to HTTP
----------------

This protocol will make use of HTTP(S) for communication rather than streaming throw raw socket objects. It may
be more expensive than raw TCP with the addition of the HTTP headers, but it gains the benifit of using a familiar,
mainstream, and well supported protocol for communication plus all the perks that come with it (potential for cacheing,
easy SSL/TLS implementation, web framework readiness, etc.).

Data Streams to Packets
------------------------

Standard HTTP communication happens in intervals.

* Connect

* Transmit

* Disconnect

The BitTorrent protocol likes to remain connected to peers during a session and keeps a constant stream open.

Bencode to JSON
----------------

BitTorrent uses a meta-data encoding scheme called bencoding. This protocol will use JSON. JSON is one of the 
lightest and most portable data markups that exists today. It powers most modern web API's. 

.Torrent File to JSON
----------------------

The file chunking nature of distributed file distribution relies on meta-data (like checksums and hashes) to validate incomming 
data. BitTorrent uess a distributable meata-data file in the form of .torrent that holds a set of bencoded data. This protocol aims
to remove the need for a distributable file by making it available through a REST API as a JSON document.

Ease of Development
--------------------

All the above mentioned aspects of the BitTorrent protocol, coupled with its sparse documentation, create an environment where developing
a client is more difficult than it needs to be. The TorrentTTP protocol aims to not just make it simple and easy to create a complient client
but to also make it simple to create interfaces for, and to, other TorrentTTP clients regardless of what language/framework was used to 
create them.

