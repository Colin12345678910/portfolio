---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---
# Green Thing from the planet Jupiter.
---
Green Thing from the planet Jupiter is a two-player competitive game, where one house cat, Cannoli, must defend his home from the conviving Green Thing. Whereas, Green Thing must ransack this house to repair his spaceship and return to his home on Jupiter. Cannoli must use all sorts of traps and devices to stop the Green Menace from running amuck all of his family's stuff.

<iframe width="560" height="315" src="https://video.fastly.steamstatic.com/store_trailers/257097824/movie480_vp9.webm?t=1744043959" title="Steam Trailier" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

**Below are specific examples of work done on Green Thing.**

- (Modern) Instanced grass renderer.

I had started this as a simple tech demo before eventually deciding to integrate it into the final game. The main goal was to create a modern grass rendering system that made good use of instanced geometry to create grass that looks better than stock terrain grass.

<iframe width="560" height="315" src="https://www.youtube.com/embed/J0mvgeY_9kk?si=ot50NbyKxHYxLtbz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

As can be seen throughout the video, it's not just a simple object instance but it also includes a few other things made to make the effect more convincing and more performant.

## Level of Detail & Culling

Simply rendering the entire field at full quality wouldn't be particularly wise or performant. Instead, when the grass gets far away from the camera I start skipping more and more blades of grass and scale up the remaining ones to mask the holes that come from a reduction in density. 

Culling is done as a basic first-person frustum culling, but since we could render about 1 million blades of grass in this patch, that operation is moved off the main thread to avoid stuttering and performance issues.

## Simple Shader

Simply put, the swaying is done as a shader animation and the random input is generated during the culling process. Very little goes on in the Fragment shader, we just take the random data passed in Vert and use it to figure out how we should sway and modify our colour. No actual lighting pass is done in this shader, but it wouldn't be hard to add a diffuse lighting pass.

## Interactivity.

Moreover, the grass itself can actually move around and be pushed by points of interest. Here it is used within Green Thing From Planet Jupiter, where we can see both players are able to push the grass around and interact with it in a semi-realistic way.

<iframe width="560" height="315" src="https://www.youtube.com/embed/LVUKe8MDisk?si=xDWlC8kkXGDLS6nf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Grass Cutouts, adjustable Grass size and interleaving grass and terrain.

Lastly, to fully integrate the grass into our levels we needed to be able to tweak how the final rendered effect came out. This ended up being achieved by having data textures that would tweak the values for each section of grass. For instance, red handles cutting out the grass, green handles the height and blue controlled how burnt the grass appeared. This rather simple system allowed the artists to easily manipulate the look of the grass to fit the scene better.

The absolute latest code is not available, but a BRP variant is shared [here](https://github.com/Colin12345678910/InstancedGrass).

- Sound Programming

I also worked on most of the Sound mixing code found within GTFTPJ, I handled writing all of the code that allowed the multilayered soundtrack to work within the game and handled transitioning audio on any of the four tracks and the logic for swapping out all four tracks for the final minute ad-hoc.

- UI Programming

I aided the Art team in implementing many of their transition and UI effects into GTFTPJ. Specifically, I created a system that allowed specific triggers to be raised to do a few things, like animate the current animator, fade in and out, etc. The system uses string identifiers to differentiate between events. Because these events were identified via human-readable strings, it was easy enough to raise these flags even in non-mono behaviour code.

Lastly, with regards to performance concerns, I'm fairly sure only around 10 events were ever used and were mostly simplifying UI code that would only get called a dozen times at most throughout the entire game.

## Source

Unfortunately, the project is a group collaboration and I cannot give out the source. As the other developers may not be okay with its distribution. However, the entire project is playable and published on [Steam](https://store.steampowered.com/app/3338200/Green_Thing_From_The_Planet_Jupiter/)