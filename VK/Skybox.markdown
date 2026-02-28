---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
sidebar: sidebarVK
bkgrnd: assets/images/Vulkan_ComputeSkybox.jpg
---
# Compute Skybox
---

![The final completed skybox]({{site.baseurl}}/assets/images/Vulkan_ComputeSkybox.jpg)
The final completed skybox.

This was a pretty small project, I was just wanting to replace the gradient with something slightly less temporary. I started by looking up how to render a plane in a compute shader, and then how to draw a sundot. Realisitically, there are better approaches that would've taken less code, but it was fun trying to implement raycasting, even if I am still a bit shaky on the math. I will probably revist this at some point to create a better skybox.