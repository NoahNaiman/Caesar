<h1 align="center">Caesar</h1>

<div
align="center">
:⚔️::nut_and_bolt::⚔️:
</div>

<div align="center">
	<strong>Venite, videte, vincite</strong><br>
	A metamorphic server making project hosting easier than ever
</div>



# Table of Contents
- [Philosophy](#philosophy)
- [Data Structures](#data-structures)

# Philosophy
Towards the end of my very first technical interview two years ago,
I was asked about Binary Search Trees. Up until that point 
I had been getting by through rattling off standard textbook
answers about everything. But when I was asked to actually implement a very
basic and essential data structure, I fumbled hard. And it was
_embarrasing_.

Since then I have become a firm believer in the idea that if
you truly want to understand something you must take it apart
and put it back together. What I have tried to do with this
project is to create a comprehensive collection of Computer
Science fundamentals. My ultimate goal is to have everything
from ArrayLists to Zippers implemented in here. Hopefully, at
the end of it, the nuts and bolts will be second nature.

This is certainly a personal project, but the code is open
and I encourage you to take a look and assess my implementations.
If you feel I could improve something somewhere, please let me
know!

**_Noah Naiman, 2018_**

# Data Structures

## Nodes

### _A Note on Nodes_
For this project I chose to abstract each type of Node into its
own seperate class and file. Each Node type inherits from the superclass Node.
I chose to write each Node seperately instead of built directly into
larger structures for two main reasons:

1. It makes reading my work less cluttered.
2. As this was a project to deeply learn fundamentals, I wanted to make strong distinctions
between each Node type.

### Binary Tree Node
A Node class to hold generic comparable data, and two pointers: a left and right child node.<br>
A building block for binary trees.<br>
Included methods are:
* Unparameterized constructor
* Parameterized constructor to set data


_Quick Link:_ https://github.com/NoahNaiman/Fundamentals/blob/master/Data_Structures/BinaryTreeNodeNode.java

### Node
A basic Node class to hold generic comparable Data.<br>
Included methods are:
* Unparameterized constructor
* Parameterized constructor to set data


_Quick Link:_ https://github.com/NoahNaiman/Fundamentals/blob/master/Data_Structures/Node.java

### Singly Linked Node
A Node class to hold generic comparable data, and a pointer another node.<br>
A building block for a singly linked list.<br>
Included methods are:
* Unparameterized constructor
* Parameterized constructor to set data
* Parameterized constructor to set data and next node.


_Quick Link:_ https://github.com/NoahNaiman/Fundamentals/blob/master/Data_Structures/SinglyLinkedListNode.java


## Trees

### Binary Search Tree
A tree where each node has at most two children: left and right.<br>
All left children's data will be comparably less than their parent's.<br>
All right children's data will be comparably greater than their parent's.<br>
Included methods are:
* Insert
* Search
* Delete first found instance of given data
* Get height
* Traverse in pre-order: parent, left child, right child.
* Traverse in order: left child, parent, right child.
* Traverse in post-order: left child, right child, parent.
* Traverse in level order.


_Quick Link:_ https://github.com/NoahNaiman/Fundamentals/blob/master/Data_Structures/BinarySearchTree.java


## Lists

### Singly Linked List
A list in which each node contains data and a pointer to the next node.<br>
Included methods are:
* Get length
* Prepend
* Append
* Search
* Delete first found instance of given data
* Delete all instances of given data
* Clone list
* Get a reversed version of the list
* Check for a loop
* Unloop
* Print out list


_Quick Link:_ https://github.com/NoahNaiman/Fundamentals/blob/master/Data_Structures/SinglyLinkedList.java
