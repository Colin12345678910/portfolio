---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
sidebar: sidebarVK
bkgrnd: assets/images/Vulkan_PBR.jpg
---
# Physically-Based Rendering & IBL
---

This section is incomplete.

Now this is the exciting part of rendering, where stuff starts to look good and not just passable.

Now, I must preface, that I had followed the [learnOpenGL](https://learnopengl.com/PBR/Lighting) [1] tutorial when it came to understanding the math behind PBR, and will be referencing both it, and another article I found useful to describe PBR. This is more of a notebook for me to reference if I need to do it again moreso than anything else.

So to start off, we should talk a little theory, not much, but it helps ground why I am doing the things I want to. So most renderers are trying to achieve photorealism, or at least, enough photorealism to support their stylization goals, and in the prerendered world, this has been achieved through raytracing, pathtracing and of course, Physically based materials for quite a while. However, in real-time using all of these are too slow or must be used sparingly. However, the principles behind PBR doesn't require raytracing, BDRF's, Irradiance and Specular reflections can all be precomputed to textures and simply looked up during calculations.

## Texture maps

So firstly, before we can really start on working on anything PBR, I needed to implement the changes to support PBR textures, and import them into my shaders so they can be used to define the objects material properties. For this engine I am supporting PBR materials authored with a normal texture and ORM (Occulusion, Roughness, Metallic) texture supplied by the GLTF file. 

![A debug render displaying the normal map as a diffuse texture]({{site.baseurl}}/assets/images/Vulkan_DebugNormal.jpg)
Here's our normal textures applied to Sponza

![A debug render displaying the MetallicRoughness map as a diffuse texture]({{site.baseurl}}/assets/images/Vulkan_DebugMetallicRoughness.jpg)
And our metallicRoughness texture.

Once loaded, these files can actually be used in a traditional non-PBR workflow to denote specular size and strength, resulting in a pretty noticable improvement with minimal effort.

![Using an ORM to denote specular strength]({{site.baseurl}}/assets/images/Vulkan_ORM.jpg)
ORMs are quite handy even outside of a PBR setting.

Now at this point we just need to import the normal texture, this one is a little more difficult since the direction of the normal will change as the object is rotated in 3D space. However, the texture will only ever describe normals in tangent space which is as described by LearnOpenGL: "Tangent space is a space that's local to the surface of a triangle: the normals are relative to the local reference frame of the individual triangles. Think of it as the local space of the normal map's vectors" [[2]](https://learnopengl.com/Advanced-Lighting/Normal-Mapping). We can easily create a TBN matrix that can convert to and from tangent and worldspace, by using the tangents and normal values present in the GLTF and calculating the remaining bitangent.

My implementation does end up differing from learnOpenGL a bit, mainly because I decided to not translate the lighting equations into tangent space, and instead convert the tangent based normals into worldspace. Mainly I decided the performance benefits weren't worth the headache dealing with tangent-spaced lighting could incurr, and that I should focus on ease of iteration since I would still be needing to implement the rest of what's required for PBR.

![The floor of sponza, with a normal map applied]({{site.baseurl}}/assets/images/Vulkan_NormalMap.jpg)
As can be seen, normal maps can really make scenes pop with detail that we could never hope to model.

## The PBR approximation.

At this point, we have everything we need to start implementing PBR, however we still need to precalculate a few cubemaps and Lookup Textures (LUTs) in order to actually be able to do PBR in a real-time setting. Since I am using the 

# References

-- [1] [LearnOpenGL, https://learnopengl.com/PBR](https://learnopengl.com/PBR)  
-- [2] [LearnOpenGL, https://learnopengl.com/Advanced-Lighting/Normal-Mapping](https://learnopengl.com/Advanced-Lighting/Normal-Mapping)    
-- [3] [LearnOpenGL, https://learnopengl.com/PBR/IBL/Specular-IBL](https://learnopengl.com/PBR/IBL/Specular-IBL)    