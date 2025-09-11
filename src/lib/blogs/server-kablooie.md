---
title: "My server exploded"
date: "11/09/2025"
slug: "server-kablooie"
highlight: true
---

# Welcome back to my blog again!!
Heres an actual blog post this time since I kinda _have_ to post something eventually.

So I’ll write about
## How I recently (almost) exploded my server

So you probably know that I have a [webring](https://ring.pre1ude.dev) and that I also host all of my services on a small linux server at home

### 4th of August, 2025
The story starts when I made an [update](https://github.com/Pre1ude0/ringamajig/commit/180346ee79278d23beeddf9c0389c364e603c1bf) to the webring to account for one of my members dynamically rendered website from markdown via invoking an extra check to the code that checks if the webring widget exists on the sites using [puppeteer](pptr.dev).

Looks fine, _right_?

### Cut to 2 months later:
I’ve moved to belgium
School has started
Things are _okay_ (not great but not bad either)
The server has already been placed in a stationary position on a shelf in my room

> (Have in mind that I have this funky issue with the family wifi where my whole setup randomly loses internet connection at a random time of day (this will be important in a minute))

One day I kinda realize that my the fans of my server have been going crazy (like I can audibly hear it all times) for a while now and it's been also just running slow in general (like pages take a solid while to load up).
At first I didn't really think much of it - it's never really been in my room before so I just naturally assumed it's always been running like this.

One day I get genuinely curious of what kind of workload is the server handling that is sound like that
I run `ps -aux` only to be greeted by MULTIPLE **WINDOWS** OF PUPPETEER MANAGED CHROME BROWSERS OPEN, just lingering there

#### fuck...

I end up [fixing the issue](https://github.com/Pre1ude0/ringamajig/commit/cf25e45b8192abad1f05fa3c2e3842cf4bf8640f) like 15 minutes later to instead use a single browser that gets closed on a graceful process exit, but that initial shock was still lingering

I'm assuming that the previously mentioned wifi connection issue was at play here in some or another way via the code not reaching the `await browser.close()` block and leaving said browser open, just munching on valuable system resources

So yeah my server didn't _really_ explode, but it was planning on doing that at some point or another

#### Moral of story: Make sure to always add some sort of process cleanup in your `catch` blocks

See you in the next blog! :3

Laura☾(aka Pre1ude0)
