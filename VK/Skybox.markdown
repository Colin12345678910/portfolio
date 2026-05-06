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

This was a pretty small project, to start with, I was just wanting to replace the gradient with something slightly less temporary. I started by looking up how to render a plane in a compute shader, and then how to draw a sundot. This was a relatively basic raycast setup, and resulted in somewhat ugly results.

![The original skybox]({{site.baseurl}}/assets/images/Vulkan_ComputeSkybox_Old.jpg)
The Skybox previously used by VulkanExperiemental.  

As you can see from the image, the skybox lacks any depth and is entirely 2D as the clouds are drawn by just indexing into a perlin noise texture. Moreover, outside of the cloud line, there is nothing else in the skybox besides a deep blue void, which is obviously not how real skys look, and results in the skybox not feeling grounded in the scene.

![Added brightness near the horizon]({{site.baseurl}}/assets/images/Vulkan_ComputeSkybox_Horizon.jpg)
The new horizon.

The first and easiest thing to improve in the skybox is the colour and appearance of the actual sky. We can make the skybox darker at the poles and brighter near the centre. This change makes the skybox look less like a uniform blue blob; but alone, still wouldn't look very good. We can exagerate this effect by layering it multiple times, raised to increasing powers.

## Raymarched clouds.

Raymarching is a technique, where through marching along a ray, 3D objects can be represented without the use of Geometry. This is a really useful technique for sky rendering since geometry isn't great at representing the transparencies required for convincing cloud structures. Moreover, since each pixel is raycast, the cost for rendering clouds is proportional to the amount of screen space they take up, meaning clouds in the far distance are cheap to render, assuming we start the raymarch near them.

My approach started through extruding the existing 2D cloud texture, into a 3D object.

![2D clouds extrude upwards in a black void]({{site.baseurl}}/assets/images/Vulkan_ComputeSkybox_Extrude.jpg)
The original 2D texture drawn as though it was 3D.

Then afterwards, we replace the texture with a 3D one, this of course, takes additional work on the engine side to support 3D textures, but it's only a bit of memory readjustment.

![3D clouds in a blue sky]({{site.baseurl}}/assets/images/Vulkan_ComputeSkybox_3DClouds.jpg)
We're finally starting to see some real depth when looking into the sky.

## Improvements.

From this point, we actually have a functional cloud renderer, of course, it isn't polished, but most of the difficult parts are done and we can focus on tweaking.

### Toon-Styled clouds

We can go in the direction of creating a more toon-like aesthetic, with basic diffuse lighting. All we need to do is approximate the normals, this costs 4 additional texture hits, but without lighting, opaque clouds don't look right. This is a fairly standard formula from my understanding, so I won't go into detail, but I adapted my formula from this article. [[1]](https://blog.maximeheckel.com/posts/painting-with-math-a-gentle-study-of-raymarching/)

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

Once the normals are calculated, you can fairly easily implement diffuse shading, we will want the ambient to be quite bright, otherwise we end up with stormy looking clouds.

![Toon Clouds]({{site.baseurl}}/assets/images/Vulkan_ComputeSkybox_Toon.jpg)
Some artifacting can be seen near the edges of our clouds.

### Volumetric clouds

Instead of stepping until we hit a cloud and drawing an opaque colour, we could step through the cloud and add density to the cloud each time we intersect with it. This gives a fairly convincing transluency effect. Moreover, because we each intersection only adds a bit to the final image, artifacts from raymarching are far less obvious. 

![Volumetric Clouds]({{site.baseurl}}/assets/images/Vulkan_ComputeSkybox_Volumetric.jpg)

Unfortunately, since we no longer end our raymarch loop early, we end up performing additional texture hits, add on the additional 4 texture hits needed to calculate normals and the performance is a bit dire. Fortunately, the translucentness does hide the lack of lighting in my cloud model, but it still isn't a perfect solution, potentially some precalculation could be done to ease.

## Conclusion.
This was a fairly fun exercise in RayMarching and Volumetrics, of course, it still isn't as practical as just using texture for most applications. However, I managed to take the Skybox from an aspect of my engine that was undeniably ugly, and made something that is perfectly servicable for a stylized/semi-stylized game. Moreover, with some adjustments like rendering the skybox at half-res, and precalculating normals, I could probably get a pretty performant diffuse lighting model working and could really upgrade the visuals of the skybox.

# References
-- [1] [MaximeHeckel, https://blog.maximeheckel.com/posts/painting-with-math-a-gentle-study-of-raymarching/](https://blog.maximeheckel.com/posts/painting-with-math-a-gentle-study-of-raymarching/)