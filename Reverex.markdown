---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---
# Reverex
---
Reverex is an asymmetric 2-player cooperative game developed over four months by my group, Tuna Melt Media and ended up taking home third in technical innovation at Toronto's Level Up game showcase.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZynOaqeCD0A?si=RnlVBbKJSs9V6LSs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[![Level Up Toronto](https://levelupshowcase.com/wp-content/uploads/2024/01/lus-holder-e1706714997565.png)](https://levelupshowcase.com/ "Level Up Toronto")

Reverex is built on Unity and C#, with additional libraries for file picking and Rendering.

I was mainly working on mechanics for this project. Specifically, I worked on the Gravity systems used during parkour and created the tech behind getting gravity to work correctly during edge cases. Moreover, I worked extensively on UI Programming and implemented most of the on-screen elements describing the player's current state.

**Below are specific examples of work done on Reverex.**


- Mobius Strip (Normals based gravity)

<iframe width="560" height="315" src="https://www.youtube.com/embed/Q38htNfhzWY?si=vbIpVmgH10wjhEWU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

This video shows a player walking around a Mobius strip as the gravity continuously changes depending on the current closest normal to the player. The normals come from the 3d mesh. Then they're transformed before being baked into an array and then are iterated through and, if debugging is enabled, displayed in the editor viewport.

- Cylinder gravity field.

<iframe width="560" height="315" src="https://www.youtube.com/embed/RFu6evkTRYE?si=7cTte2GueDS0G3xG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

This is another showcase of this gravity technique and displays the versatility and variety of shapes this technique can cover. As can be seen here, this technique can be used on various convex shapes. Using normal-based gravity fields heavily reduced the workload that would have been required to manually place all of the fields necessary with a volume-based approach.


## Source
Sadly, the source for this project will not be available. However, it can be downloaded from [here](https://b3mn.itch.io/reverex)