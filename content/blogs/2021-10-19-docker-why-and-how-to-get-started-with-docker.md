---
title: 'Docker: Why and How to get started with Docker'
date: '2021-10-19'
tags: ['devops', 'webdev', 'tech']
slug: 'docker-why-and-how-to-get-started-with-docker'
description: 'Docker is an ecosystem of services that are used to create, run and administrate containers.

In simple terms, a container is an isolated environment just for running a particular application. A container essentially contains the application along with all the dependencies and configuration files that it needs for running.

More on that later. First, let''s see why do we need docker or containerization in particular.'
featuredImage: 'https://images.ctfassets.net/8z3meboy5dgi/6nzWC6dWuaFTZyCJmqmycj/665df1f46b3ef5a47f54cd621c7230a1/cover.jpg'
---

# What is Docker?

Docker is an ecosystem of services that are used to create, run and administrate containers.

In simple terms, a container is an isolated environment just for running a particular application. A container essentially contains the application along with all the dependencies and configuration files that it needs for running.

More on that later. First, let's see why do we need docker or containerization in particular.

# Why Docker?

The era of cloud computing sprung up a challenge of managing and maintaining the application over various cloud and development environments. Regardless of the underlying platform the application should remain stable and operational. But because of the 'unknown' associated with running the application on a foreign platform, possibility of environment-specific bug increases.  A solution to this is to pack and ship the application along with the dependencies, configuration files and libraries that the application needs to run and operate efficiently. This process is called containerization. Which docker does brilliantly.

# What is an image and a container?

## Docker Image

An image is a snapshot of a file system (application and its dependencies) with a startup command. So essentially, an image may as well be a complete react application with the startup command as `npm start`.

More formally, an image is like a blueprint for creating a docker container.

## Docker Container

Before we jump on to containers, let me quickly throw in some operating system related stuff.

Every running process has a bunch of hardware/software resources associated with it. When a process is running, it communicates with the kernel (core of OS that controls all the tasks of the system) to access those resources.

Each process may have different requirements for running (for instance, one app maybe using python2 and the other python3.) and because of this reasons, containers are used to isolate the environments.

A container is an isolated running instance of a process with it's own set of resources, file system and what not.

Continuing the analogy, if an image is a blueprint to create a container than in OOP reference, an image is a class and a container is an instance of that class. So essentially you can create as many containers as you want from a single image.

# Getting started with docker

You'll be needing docker desktop for the tutorial down below. [Docker Desktop](https://www.docker.com/products/docker-desktop)

![Computer Architecture](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ic5sjfuvp8xqo685jjs6.png)

When you install docker desktop (For Mac and Windows(pro)), docker runs a Linux virtual machine behind the scenes to run something called as a 'docker server'

**Extra info:**
Docker uses Linux kernel because of the feature called namespaces. Namespaces are a feature of the Linux kernel that partitions kernel resources such that one set of processes sees one set of resources while another set of processes sees a different set of resources

When the docker server is up. You can communicate with it using docker cli

```powershell
docker run hello-world
docker run <image_name> <optional: command>
```

`docker`: reference to the docker client

`run`: Try to create or run a container

`<image_name>`: Name of image to use for this container

`<command>`: !optional. This command would override default startup command.

For instance

## Some docker commands

Here are some of the commands I daily get to use.

```powershell
docker ps                                 // List running containers
docker ps -all                            // List all containers
docker system prune                       // Remove all unused containers, networks, images (both dangling and unreferenced), and optionally, volumes.
docker logs <container_id>                // Fetch the logs of a container
docker stop <container_id>                // Fetch the logs of a container
docker kill <container_id>                // Stop one or more running containers
docker exec -it <contianer_id> <command>  // runs a new command in a running container.
docker run -it <container_id> sh          // Overides the default command and opens a shell in the running container

```

## -it flag

```powershell
docker run -it busybox sh
```

`-i` → connects your terminal with the container's STDIN (Hence the commands are directly run inside the container)

`-t` → Does the formatting of the input/output in the terminal

`-it` → You can club them together like this

[All the docker commands](https://docs.docker.com/engine/reference/commandline/docker/)

# Thank you!

Would love to hear your thoughts.