---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
sidebar: sidebarVK
bkgrnd: assets/images/Vulkan_GLTF.jpg
---
# GLTF Scene support
---

![An example GLTF (Sponza) provided by Khronos]({{site.baseurl}}/assets/images/Vulkan_GLTF.jpg)

TODO: This section is a bit sparse, and doesn't really serve much of a point; maybe I should spend some more time reading about GLTFs so I have something interesting to say here...

At this point, I have a way of rendering a mesh from a GLTF, but I haven't actually perserved any of the structure of a GLTF and if I wanted to render out a scene, I would need to manually define it. Not only would that be a waste of time, but it would quickly become unmaintable. Luckily, GLTFs don't just describe individual models, but it can describe an entire render hierachy. We can read in that data and construct our own Render Tree using something like FastGLTF. 

# GLTF 

Now, GLTFs are a monster of a format, quite extendable and supports pretty much everything you could want for a 3D model, they contain model information, textures, UVs and can even support skeletons. Essentially everything I could want to render without getting into supporting custom shaders or render pipelines.

In this engine, FastGLTF loads our data and then a class pulls data from that FastGLTF data, substituting any missing data with an apporpriate error value/texture if none are available. Meshes are just pulled during this loading process and then converted to the Vertex structure used within my engine. Then we process each image through STBI, getting the raw image data from those textures which are then passed to my engine's CreateImage function which ultimately will copy the contents of that image into a buffer accessible in VRAM. Then each material gets an index that will be used to point to the correct AllocatedImage.