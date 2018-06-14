<h1 align="center">Sauron</h1>

<div
align="center">
:eyes::volcano::ring:
</div>

<div align="center">
	<strong>One server to rule them all</strong><br>
	A metamorphic server to make project hosting easy
</div>



# Table of Contents
- [Philosophy](#philosophy)
- [Usage](#usage)
- [FAQ](#faq)

# Philosophy
I attend a whole bunch of hackathons, They are one of my favorite activities. But time after
time I find myself using technologies I don't fully understand. And that bothers me to no end!
Like many a computer scientist before me, not knowing how or why something works keep me up at
night! And what's worse, sometimes I don't even have a vague idea of the general structure behind
it. One such example is Amazon's Web Services. Frequently used by programmers, but rarely understood.

A few weeks back my friends and I were discussing the difficulty of blindly following tutorials to
to quickly host a hackathon project on the cloud. We talked about how nice it would be if hackathons
had a quick and system wherein hackers upload their projects and the hackathont takes care of hosting.
But once again, none of us really had any idea of how it would work. So I googled around a little bit
and, of course, ended up on AWS. Particularly Elastic Beanstalk. All I could think of was, "How the heck
would that even work?" And thus this project was born. It's certainly not on the same scale, and can't
come close to providing the same resources, but the general idea is the same.

I wanted to see how it would be possible to create a server that not only modified itself at runtime,
but also was able to spawn and host other child processes. Further, I wanted to know how the entire
ecosystem would work together. I know when run it does not look pretty, no nice CSS, but it works
and I understand not just how but why. And to me that is the important part.

**_Noah Naiman, 2018_**


# Usage

## Dependencies
If you do not already, make sure to install Nodejs and the Node Package Manager (npm)

## Download
To download run the following command:
```git clone https://github.com/NoahNaiman/Sauron.git```
Navigate to the newly cloned directory and run:
```npm install```
Finally, to fire up the server just run:
```npm start```

## The Interface
Sauron runs by default on localhost 3000. Naviagte there and you will see this form:

![Alt text](/public/images/SauronForm.png?raw=true)

### Project Name
A name given to your project, must be unique from any other uploaded project or it will be overwritten.

### Email
A real email. Possible expansion plans include sending this address a note when their project is hosted, as
well as how to navigate to it.

### Launch Command
This is the command for launching whatever your hosted project is, i.e. npm start, python myProjectName.py, etc.

### Files
The actual project to be hosted. As of right now Sauron does not accept subdirectories, so all files and dependencies
must be in the same folder.


# FAQ

### Why is it called Sauron?
Because it is one server to rule them all.

### So...it's AWS Elastic Beanstalk?
To an extent it is similar. I value being able to use cloud tools, and in a real work environment would certainly
have chosen to use them over writing the entire thing from scratch. However this was a personal project I wanted
to learn from, and I really think I did.

### Isn't it sort of insecure to let people upload whatever they want?
Yes. Were I to use this for production I would add several more authentication methods to make it more secure. While
I can't control what people upload, some possible ways to mitigate this issue include: adding a database of authenticated
users, scanning uploaded files for malicious intent, keeping track of resources being used by various processes in case a
kill is needed for any of them.

### Can I use this for my projects?
Abosuletely! Be aware that this is a personal project and therefore not 100% stable. Using it will require heavy tweaking,
but any suggestions, forks, pull requests, etc. are very welcome!