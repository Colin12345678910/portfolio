---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default

---
# VulkanTest
---
VuklanTest was a render project intended to teach myself not just how Vulkan works in comparison to DirectX, but also how a game engine is actually structured. The project was started by following some resources on Vulkan, after that point I've been spending time adding onto the base engine and bringing technical features I already knew about like shadow casting to bring the engine up to my own standards.

- Arbitrary Meshes

At it's most basic, a render engine is something that can convert a representation of three dimensional space and convert it into something understandable by the human eye. Therefore, it makes a ton of sense to start with getting meshes rendered into the scene, ultimately there is some prior work done to configure Vulkan, and setting up buffers for all images used in the swapchain. However, a lot of the bones needed to setup Vulkan aren't the most interesting to code or talk about, so just know I am skipping over quite a bit to make this more digestible.

![A 3D render of suzanne](assets/images/Vulkan_VertexBuffer.png)

So, first of, this is the Suzanne model from blender, this was pretty early on in me learning Vulkan, so I was mostly following a written guide which provided some basic assets. When it comes to loading Vertex information in Vulkan there are a few options you can take to achieve roughly the same effect. 

Typically, you can use VKBuffer and bind it in a command buffer using vkCmdBindVertexBuffers and submit it, this would automatically push the Vertices into a structure that can be easily accessed via GLSL. However, thats not the modern way to handle Vertex buffers, usually you would use Storage Buffers as they are a lot more flexible, allowing you to push whatever information to the GPU that you want, which is really useful for Vertex packing, and other techniques that can reduce GPU bandwidth.

![Some texture mapped ducks](assets/images/Vulkan_TextureMapping.png)

Here's some ducks being rendered with an invalid texture

- GLTF scene support

![An example GLTF (Sponza) provided by Khronos](assets/images/Vulkan_GLTF.jpg)

At this point, I have a way of rendering a mesh from a GLTF, but I haven't actually perserved any of the structure of a GLTF and if I wanted to render out a scene, I would need to manually code it. Not only would that be a waste of time, but it would quickly become unmaintable. Luckily, GLTFs define a node structure, and we can read in that data and construct our own Render Tree using something like FastGLTF. Since I can define each class node to render itself and it's children, it's rather easy to render the entire tree once using the root node.

- Improvements

Now we can render scenes and all, but it's become fairly obvious that our final output isn't paticularly interesting. Our renderer is quite comparable to early 3D renderers and doesn't draw materials correctly, not making any use of PBR or more advanced lighting techniques. However, there's a few things we can implement to bring the renderer up to speed and make it far more impressive and far more adaptable.

- Shadowmapping

At the moment our objects don't really look like they exist in scene, it almost looks like they have been edited into the image with something like photoshop. The most glaring omition is the lack of shadows being cast by objects in the scene. After all, a shadow will always be cast when something obscures any part of a light source.

All you need to implement such a feature, is to determine whether or not a pixel is in shadow. Now in the real world, an area is not in shade if photons can reach it's surface, you can simulate that by tracing rays from the object to the light. However, that's typically pretty slow ( RTX helps, but I'm not going into it right now ), so instead we can use a trick to simulate shadows, without the more complex processing.

If we render the scene from the Sun's prespective, we can actually create a depth texture, which represents the depth each pixel from the Sun. Using the camera matrix, we can actually project any point in 3D space into the same space as our shadow texture. The X and Y position represent where we are on the texture, while the z defines our distance from the sun. At this point, we can check if we are obscured if our distance is greater then the depthimage of the sun, then render the pixel in shade.

![The same scene as before, but with Shadowmapping](assets/images/Vulkan_Shadow.jpg)

- PCF

While the scene certainly looks better with Shadows, they kinda look a bit, bad. They are extremely pixelated and not paticularly soft. While the pixelation could be fixed by bumping up the shadow resolution, that comes at the expense of performance and still doesn't address the harshness of the shadows. There are several different techniques for cleaning up shadow maps, like [Cascaded shadow maps](https://learnopengl.com/Guest-Articles/2021/CSM) which utilize several different shadow passes for different points of the frustrum, or [Variance Shadows](https://developer.nvidia.com/gpugems/gpugems3/part-ii-light-and-shadows/chapter-8-summed-area-variance-shadow-maps). Ultimately, I am just going to use traditional PCF filtering alongside some noise to smooth out the shadowmaps.

![Final result of the filtering](assets/images/Vulkan_PCF.jpg)

PCF works by sampling the projected texture map several times in an image kernel with the sum of successes creating the shadow coefficent. When projected this results in shadows with less defined edges, but will have the appearance of multiple shadows being cast by several different light sources. To solve this, some noise can be added during the sampling process to ensure each kernel samples slightly differently to prevent obvious artifacts; at the expense of some unwanted dither noise.

- Future Improvements

## Multipass rendering (RenderGraphs?)
## Ambient Occulusion
## Light LUTs
## Animations (Basic doors)

- Completed work that needs documentation

## IMGUI debug interface (+CVars)

- Source

The source for this project is located [here](https://github.com/Colin12345678910/vulkan-experimental). No compiled binaries have been created for this project as it is still a work in progress.
