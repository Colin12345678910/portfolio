---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
bkgrnd: assets/images/Voxeltest.png
---
# VoxelTest
---
Voxeltest is an experimental render engine developed with DirectXTK and C++ intended to render out procedurally generated voxel worlds with multiple complex rendering features, such as procedural meshing, Shadowmapping and Chunksplitting.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ncQ3baJhoMk?si=EEPza7qRoZ1yW18E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Most features implemented in VoxelTest

- Multithreaded procedural meshing.

**Voxeltest** uses thread pooling and locks to implement basic multithreading while converting raw chunk data into completed and renderable meshes.

- Chunk splitting and infinite generation.

When creating a Voxel-based game it's important to define how the engine will split chunks so they can be appropriately meshed, building one large chunk will generally result in poor performance as the game struggles to mesh in an adequate amount of time after every change. Moreover, to design a potentially infinite play space, you must split the world into chunks to remove chunks no longer required for gameplay.

- Procedural world generation.

Voxeltest implements a Perlin noise-based world generator that generates all chunks in a given world.

- Shadowcasting.

Voxeltest uses shadow casting to generate Shadowmaps to sample from during rendering. In this process, a depth texture is drawn from the camera's perspective and used to figure out if pixels should be considered obscured from the Shadowmap camera's perspective. This is then improved with a small offset and sampling the Shadowmap multiple times to create smooth and appealing shadows.

## Source
The source for this project is located [here](https://github.com/Colin12345678910/VoxelTest). No compiled binaries have been created for this project as it is still a work in progress.