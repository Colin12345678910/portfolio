// 06042025
//This function will run a callback whenever an object is fully on screen, used for fading in certain elements.
function onVisible(element, callback)
{
    var observer = new IntersectionObserver((entries, observer) =>
    {
    entries.forEach(entry => {
        console.log(entry.intersectionRatio);
        if (entry.intersectionRatio >= 1)
        {
            callback();
            observer.disconnect();
            observer.unobserve(element);
        }
    });
    }).observe(element);
}

//This script is rather basic, infact, all it does here is fade in something whenever the screen scrolls
//to fully include this object. This might be a bit amateruish.

var imgs = document.getElementsByTagName("img");
var videos = document.getElementsByTagName("iframe");

console.log(videos.length);
for (let i = 0; i < imgs.length; i++)
{
    onScrollFadeIn(imgs[i]);
}
for (let i = 0; i < videos.length; i++)
{
    onScrollFadeIn(videos[i]);
}
    
function visibiltyCheck(elem)
{
    onVisible(elem, () => 
        {
            elem.classList.remove('fadeout');
            elem.classList.add('fadein');
        }); 
}
function onScrollFadeIn(elem)
{
    elem.classList.add('fadeout');
    visibiltyCheck(elem);
    window.addEventListener("scroll", function(){ 
        visibiltyCheck(elem);
    });
}