---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
bkgrnd: assets/images/Maple.png
more: true
---
# Minecraft Projects
---
Alongside most of my regular game-specific projects, I have also worked on a handful of Minecraft Mods. I thought it would be nice to document them, even if they are overall smaller projects.

# Stackable

![Higher stack sizes](assets/images/Stackable.jpg "Higher stack sizes.")

So this mod kinda came from a design issue I've had with Minecraft for years: Inventory management sucks, you never seem to be able to hold everything you want. Your inventory feels cramped, not just in the number of slots, but in the total amount you can hold in any given slot. The official intended solution to this was shulkerboxes and bundles, but neither really hit the mark.

Shulkerboxes and bundles follow a similar simple design philosophy; you can store more types of objects inside this container that takes the place of a single slot. However, both solutions suffer from the same design problem: to access these containers, you must interact with a nested menu. In the case of the shulkerbox, you must place it down, look inside it, and pull the item out; this gets exponentially worse if you don't know exactly where the item you need is, as you must open each shulker to  know what's even in it. On the other hand, bundles require you to either dump everything or pull each item out one by one to get the specific item you need, which is yet again even more menus you must jump through to just be able to store more in your own inventory!

- Why did I just increase the stack limit? 

To make a long story short, I decided to increase the stack limit on all blocks. That way, you are managing inventory slots rather than needing to juggle both the number of items you have and the number of different slots they can fill. Overall, this was a relatively non-intrusive solution; it doesn't require extra effort by the player and streamlines gameplay.

- Technical challenges.

This project focused on creating portable code and automation, not in the traditional meaning of operating system portability, but rather that my code needed to be very modloader-agnostic. In the end, I used the Multiloader Library approach, where the mod exists as a Java library with shared mixins. However, loader-specific code and mixins are instead written in their own respective projects. Alongside this, I wrote a CI pipeline that would compile for each modloader and release them all at once on both Curseforge and Modrinth. This was overall necessary as my Mod spans across Fabric, Forge and NeoForge on both 1.21.11 and 1.21.1. Without this automation pipeline, I would need 12 separate manual submissions for any update or hotfix.

# Regenerations

Regenerations was my first ever Minecraft Mod, three years old at this point. I really wanted to create a large vanilla-style content mod, and while that never materialized, I did create a few biomes with custom terrain features I am still proud of.

- New Birch forests.

![New Birch forests.](assets/images/Birch.png "New Birch forests.")


I really wanted to focus on verticality. I always loved the scale of large old trees in real life and was always somewhat disappointed in Minecraft's small forests. So I learned how to write Fabric mods and designed and created a custom trunkplacer based on the unused concept art shown at Minecraft Live.

- Maple forests

![Maple forests.](assets/images/Maple.png "New Maple forest.")

This was an experiment in learning how a more complex procedural feature work, so I made my own trunkplacer, which would recursively place smaller branches starting from the main trunk until the next branch would be smaller than a block. Ultimately, I think this came out looking really nice, and despite not being the approach I would use today, I still think I could take inspiration from its design and do something similar if I ever wanted to create more procedurally generated trees.

# Source code

The source for Stackable is open under a CC0 license on [Github](https://github.com/LinkachuGaming/Stackable). whereas I have left Regenerations as all rights reserved, both [Stackable](https://www.curseforge.com/minecraft/mc-mods/stackable127) and [Regenerations](https://www.curseforge.com/minecraft/mc-mods/regenerations) are available on Curseforge if you want to look further into either project.
