---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
sidebar: sidebarVK
bkgrnd: assets/images/Vulkan_ShadowPCF.jpg
---

# Shadowmapping

![A non-shadowmapped scene]({{site.baseurl}}/assets/images/Vulkan_GLTF.jpg)
Our current scene without shadowmapping

There is a glaring issue with my renderer at this point, objects don't really look like they exist in scene. They almost seem like they have been super-imposed into the image with something like photoshop. The most glaring omition is the lack of shadows being cast by objects in the scene. Without them the objects really don't feel like they exist in the same world as each other.

Luckily, all you need to implement such a feature, is to determine whether or not a pixel is in shadow. Now in the real world, an area is not in shade if photons can reach it's surface, you can simulate that by tracing rays from the object to the light. However, that's typically pretty slow ( RTX helps, but I'm not going into it right now ), so instead we can use a trick to approximate shadows, without the more complex processing.

## Multiple render passes in different spaces.

When rendering a scene, we usually also create a depth texture which is used to perform depth tests, ensuring any fragment that should be obscured from the camera's perspective gets discarded. However, we can render our scene multiple times per frame, and if we render the scene from the Sun's prespective, we can actually create a texture that can be used to depth test any 3D point as long as it's in the sun's space.

![The scene rendered from the camera's perspective]({{site.baseurl}}/assets/images/Vulkan_Depth.jpg)
The scene rendered from the camera's perspective.

Of course, on it's own, being able to depth test in the sun's space isn't too helpful, however we aren't limited to checking the texture from the same render pass. In fact, with the power of using the sun's viewProj matrix we can effectively project any vertex into the same space as our sun and it's shadow texture. Now each X and Y of this shadowPos can correspond with a point on the shadow texture and the Z can be used to perform a depth test with respect to the sun. At this point, that depthtest will determine whether or not to render the fragment in shade.

![The same scene as before, but with Shadowmapping]({{site.baseurl}}/assets/images/Vulkan_Shadow.jpg)

- PCF

While the scene certainly looks better with Shadows, they kinda look a bit, bad. They are extremely pixelated and not paticularly soft. While the pixelation could be fixed by bumping up the shadow resolution, that comes at the expense of performance and still doesn't address the harshness of the shadows. There are several different techniques for cleaning up shadow maps, like [Cascaded shadow maps](https://learnopengl.com/Guest-Articles/2021/CSM) which utilize several different shadow passes for different points of the frustrum, or [Variance Shadows](https://developer.nvidia.com/gpugems/gpugems3/part-ii-light-and-shadows/chapter-8-summed-area-variance-shadow-maps). 

Ultimately, I am just going to use traditional PCF filtering alongside some noise to smooth out the shadowmaps.

![Final result of the filtering]({{site.baseurl}}/assets/images/Vulkan_PCF.jpg)

PCF works by sampling the projected texture map several times in an image kernel with the sum of successes creating the shadow coefficent. When projected this results in shadows with less defined edges, but will have the appearance of multiple shadows being cast by several different light sources. To solve this, some noise can be added during the sampling process to ensure each kernel samples slightly differently to prevent obvious artifacts; at the expense of some unwanted dither noise.