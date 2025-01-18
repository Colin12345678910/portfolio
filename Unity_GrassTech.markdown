---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
more: true
---
---
# (Modern) Instanced grass renderer.
This was a pretty small project that took about two days from start to finish. The main goal was to create a modern grass rendering system that made good use of instanced geometry to create grass that looks better then stock terrain grass.

<iframe width="560" height="315" src="https://www.youtube.com/embed/J0mvgeY_9kk?si=ot50NbyKxHYxLtbz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

As can be seen throughout the video, it's not just a simple object instancer as it also includes a few other things made to make the effect more convincing and more performant.

- Level of Detail & Culling

Simply rendering the entire field at full quality wouldn't be paticularly wise or performant. Instead when the grass gets far away from the camera I start skipping more and more blades of grass and scale up the remaining ones to mask the holes that come from a reduction in density. 

Culling is done as a basic first person frustrum culling, but since we could render about 1Million blades of grass in this patch, that operation is moved off the main thread to avoid stuttering and performance issues.

- Simple Shader

Simply put, the swaying is done as a shader animation and the random input generated with data fed during the culling process. Very little goes on in the Fragment shader, we just take the random data passed in Vert and use it to figure out how we should sway and modify our colour. No actual lighting pass is done in this shader, but it wouldn't be hard to add a diffuse lighting pass.

- Interactivity.

Moreover, the grass itself can actually move around and get pushed by point's of interest. Here it is used within Green Thing From Planet Jupiter, where we can see both players are able to push the grass around and interact with it in a semi-realistic way.

<iframe width="560" height="315" src="https://www.youtube.com/embed/LVUKe8MDisk?si=xDWlC8kkXGDLS6nf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

- Source.
The absolute latest code is not available, but the BRP variant is shared [here](currentlyUnavailable). No Binaries will be provided.

I built this project for Unity 2023.2 and the Built in Render pipeline/Universal Render Pipeline.
