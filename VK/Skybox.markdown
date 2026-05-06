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

This was a pretty small project. To start with, I just wanted to replace the gradient with something slightly less temporary. I started by looking up how to render a plane in a compute shader, and then how to draw a sundot. This was a relatively basic raycast setup, which was somewhat ugly.

![The original skybox]({{site.baseurl}}/assets/images/Vulkan_ComputeSkybox_Old.jpg)
The Skybox previously used by VulkanExperimental.  

As you can see from the image, the skybox lacks depth and is entirely 2D, as the clouds are drawn by just indexing into a perlin noise texture. Moreover, outside of the cloud line, there is nothing else in the skybox besides a deep blue void, which is obviously not representative of a real sky, and results in the skybox not feeling grounded in the scene.

![Added brightness near the horizon]({{site.baseurl}}/assets/images/Vulkan_ComputeSkybox_Horizon.jpg)
The new horizon.

The first and easiest thing to improve in the skybox is the colour and appearance of the actual sky. We can make the skybox darker at the poles and brighter near the centre. This change makes the skybox look less like a uniform blue blob, but it still doesn't look very good. We can solve this by exaggerating the effect by layering it multiple times, raised to increasingly higher powers.

## Raymarched clouds.

Ray marching is a technique where, through marching along a ray, 3D objects can be drawn without using triangles/meshes; instead, we can define these objects through math and 3D textures. This is a really useful technique for sky rendering since geometry isn't great at representing large, detailed pseudo-random shapes. Moreover, since each pixel is raycast, the cost for rendering clouds is proportional to the amount of screen they take up; in comparison, the cost of vertices and faces remains the same (or sometimes higher if many occupy the same pixel) as long as they are drawn.

My approach started by extruding the existing 2D cloud texture into a 3D object.

![2D clouds extrude upwards in a black void]({{site.baseurl}}/assets/images/Vulkan_ComputeSkybox_Extrude.jpg)
The original 2D texture drawn as though it was 3D.

Afterwards, we replace the texture with a 3D one; this, of course, takes additional engine-side work to support 3D textures, but it's only a little bit.

![3D clouds in a blue sky]({{site.baseurl}}/assets/images/Vulkan_ComputeSkybox_3DClouds.jpg)
We're finally starting to see some real depth when looking into the sky.

## Improvements.

From this point, we  have a functional cloud renderer. Of course, it isn't polished, but most of the difficult parts are done, and we can focus on tweaking.

### Toon-Styled clouds

If we want a toon-like aesthetic, with basic diffuse lighting. All we need to do is approximate the normals; this costs 4 additional texture hits, but without lighting, opaque clouds don't look right. This is a fairly standard formula, so I won't go into detail, but it was adapted from this article. [[1]](https://blog.maximeheckel.com/posts/painting-with-math-a-gentle-study-of-raymarching/)

```glsl
float3 getNormal(float3 p)
{
    const float eps = pushConstants.data2.z;
    const float2 h = float2(eps, 0);

    float3 n = map(p) - float3(
                                  map(p - h.xyy),
                                  map(p - h.yxy),
                                  map(p - h.yyx),
    );

    return normalize(n);
}
```

Once the normals are calculated, you can fairly easily implement diffuse shading. We will want the ambient to be quite bright, otherwise we end up with stormy-looking clouds.

![Toon Clouds]({{site.baseurl}}/assets/images/Vulkan_ComputeSkybox_Toon.jpg)
Some artifacting can be seen near the edges of our clouds.

### Volumetric clouds

Instead of stepping until we hit a cloud and drawing an opaque colour, we could step through the cloud and add density to the cloud each time we intersect with it. This gives a fairly convincing transluency effect. Moreover, because each intersection only adds a bit to the final image, artifacts from ray marching are far less obvious. 

![Volumetric Clouds]({{site.baseurl}}/assets/images/Vulkan_ComputeSkybox_Volumetric.jpg)

Unfortunately, since we no longer end our raymarch loop early, we end up performing additional texture hits, adding the additional 4 texture hits needed to calculate normals, and the performance is a bit dire. Fortunately, the translucentness of this approach hides the lack of lighting in my cloud model well, but it still isn't a perfect solution.

## Conclusion.
This was a fairly fun exercise in RayMarching and Volumetrics; of course, it still isn't as practical as just using texture for most applications. However, I managed to take the Skybox from an aspect of my engine that was undeniably ugly and made something serviceable for a stylized/semi-stylized game. With adjustments like rendering the skybox at half-res and precalculating normals, I can probably get a performant diffuse lighting model working and further upgrade the skyboxes visuals.

# References
-- [1] [MaximeHeckel, https://blog.maximeheckel.com/posts/painting-with-math-a-gentle-study-of-raymarching/](https://blog.maximeheckel.com/posts/painting-with-math-a-gentle-study-of-raymarching/)
