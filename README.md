# Fractal Render

A WebGL Renderer for Fractal Equations.

<a target="_blank" href="https://zobeirhamid.github.io/FractalRender/">WebGL Project Link</a> (to open the GUI press your keyboard's SPACE_BAR)<br>

<a target="_blank" href="https://youtu.be/cubfsw_vo30">Video Walkthrough</a> (Youtube)

## Abstract

This project implements a fractal equation renderer using WebGL. It will use the Mandelbrot Set as its base implementations to explore the requirements needed for a fractal equations renderer, but will leave the option open to integrate more fractal equations.

## Theory

### Introduction to Fractals

<p>
Fractals are all around us. Broccoli is a fractal, snowflakes are fractals, and the pattern of a shell is a fractal. The mathematically definition of a fractal is very vague, since it is not understood properly, but it involves the recursion of a pattern or equation since fractals represent the concept of "self-similarity". They are objects of investigation in regards to Chaos Theory since most graphs representing chaos are fractals.
</p>

### KochFlake

<p>
For illustration purposes I will use a snowflake to clearly define the properties which makes it a fractal.
</p>
<div align="center">
  <figure>
    <img width="500" height="500" src="https://github.com/zobeirhamid/FractalRender/raw/master/docs/images/KochFlake.png"><br>
    <figcaption>The KochFlake defined by Helge von Koch</figcaption>
  </figure>
</div>
<p>
What you see here is the KochFlake, defined by Helge von Koch as the Fractal representing a snowflake. The base is a regular triangle, for which after each iteration each side will receive three more sides. With more iteration, the KochFlake looks more and more like a Snowflake. After a small observation, it is clear that the area of the KochFlake is finite, but its perimeter is infinite, since it is getting extended after each iteration, therefore it is convergent and divergent at the same time. Furthermore, the most important property, which makes it a fractal, is that it is self replicating, so each corner is a smaller KochFlake, therefore by zooming into the KochFlake, you will see smaller version of the big version, which makes it a Fractal since it is self-smiliar.
</p>

### Mandelbrot Set

<p>
The KochFlake is easy in theory, but hard to implement since you have to add three sides for each side, and calculate where to add the new vertices too. A easier fractal to render would be the Mandelbrot Set.
</p>
<div align="center">
  <figure>
    <img width="500" height="375" src="https://github.com/zobeirhamid/FractalRender/raw/master/docs/images/mandelbrot.jpg"><br>
    <figcaption>The Mandelbrot Set</figcaption>
  </figure>
</div>
<p>
Fig.2 reprsents the Mandelbrot Set, with the area in black representing the points in the Complex Plane which are converging, and the points with color are diverging. The different color values are representing the rate of divergence. The Mandelbrot Set is very easy to implement since its equation is a simple recursion function.
</p>
<div align="center">
  <figure>
    <img src="https://render.githubusercontent.com/render/math?math=f_{c}\left(z\right)=z^{2}%2Bc"><br>
    <figcaption>The Fractal equation for the Mandelbrot Set</figcaption><br>
  </figure>
  <br>
</div>
<p>
This equation is used to render the Mandelbrot Set by iterating through all the Complex Numbers in the Complex Plane and determining which Complex Number <img src="https://render.githubusercontent.com/render/math?math=c"> is converging and which is diverging slowly by reapplying the equation by itself start with <img src="https://render.githubusercontent.com/render/math?math=z=0">, while we keep track of the iteration count in the variable <img src="https://render.githubusercontent.com/render/math?math=m_{iterations}">.
</p>
<div align="center">
  <div>
    <p>
      <img src="https://render.githubusercontent.com/render/math?math=z=0"><br>
      <img src="https://render.githubusercontent.com/render/math?math=z_{n}=(z_{n-1})^{2}%2Bc"><br>
    </p>
    <img src="https://render.githubusercontent.com/render/math?math=z_{m=0}=0^{2}%2Bc"><br>
    <img src="https://render.githubusercontent.com/render/math?math=z_{m=1}=c^{2}%2Bc"><br>
    <img src="https://render.githubusercontent.com/render/math?math=z_{m=2}=(c^{2}%2Bc)^{2}%2Bc"><br>
    ...
  </div>
</div>

## Implementation

### Requirements

- Rendering the Mandelbrot Set
- Allow User Interactions e.g. zooming
- GUI for manipulating variables, e.g. <img src="https://render.githubusercontent.com/render/math?math=MAX_{iteration}"><br>

<p>
Allowing for User Interactions, I would need to take advantage of the GPU, therefore I would use shaders. I was familiar with GUI programming in Javascript, therefore I decided to use WebGL which is a subset of OpenGL for the browser, so I can use Javascript and GLSL. I decided to code everything from scratch for learning purposes.
</p>

### WebGL

#### First Step: Setting up the Pixel Space

<p>
The first step was to decide how to render the Complex Plane onto Pixel Space. In a broader perspective, the Mandelbrot Set always takes in the whole screen since rendering includes the divergent and convergent area, so it is one big object. Therefore I decided to use 4 vertices for each corner of the Pixel Space to create one big rectangle which we draw the Mandelbrot Set on.<br>
</p>

<div align="center">
  <figure>
    <img width="500" height="333" src="https://github.com/zobeirhamid/FractalRender/raw/master/docs/images/coordinate1.png"><br>
    <figcaption>The whole Pixel Space as one rectangle</figcaption>
  </figure>
</div>

#### Second Step: Mapping the Pixel Space to the Complex Space

<p>
To be able to draw the Mandelbrot Set in Pixel Space, we need to transform the Pixel Space into Complex Space, so we can assign each pixel a unique Complex Number <img src="https://render.githubusercontent.com/render/math?math=c=a%2B{b}i">.
</p>

<p>
Convenient, the Complex Space is 2-dimensional as our Pixel Space is, therefore we can use the real part <img src="https://render.githubusercontent.com/render/math?math=a"> for our x-values and the imaginary part with the real number <img src="https://render.githubusercontent.com/render/math?math=b"> as our y-values, so we can store a Complex Number in 2-dimensional vector.
</p>

<p>
Next, we observe that the Complex Space is infinite, but the Pixel Space is finite, therefore we have to bound the Complex Space, by four Complex Numbers. We use the four Complex Numbers as the vertices of the rectangle, and interpolate in between them using the pixel position and the Pixel Space's width and height.
</p>
<div align="center">
  <figure>
    <img width="500" height="333" src="https://github.com/zobeirhamid/FractalRender/raw/master/docs/images/coordinate3.png"><br>
    <figcaption>Setup for Pixel Space to Complex Space conversion</figcaption>
  </figure>
</div>

<p>
Now, we just have to create a bijection between the Pixel Space and Complex Space using the following equation:
</p>
<div align="center">
  <figure>
    <img src="https://render.githubusercontent.com/render/math?math=c=x_{0}%2Bx\cdot\frac{\left(x_{1}-x_{0}\right)}{width}%2Bi\cdot\left(y_{0}%2By\cdot\frac{\left(y_{1}-y_{0}\right)}{height}\right)"><br>
    <figcaption>This equation maps every pixel to a unique Complex Number</figcaption>
  </figure>
</div>
<p>
Now we can iterate through the whole Pixel Space and associate each Pixel with a Complex Number <img src="https://render.githubusercontent.com/render/math?math=c"> and iterate the Mandelbrot Set Equation on <img src="https://render.githubusercontent.com/render/math?math=c"> and determine if it's converging or diverging and if it is diverging, we can determine the rate of divergence.
</p>

### Third Step:Iterating the Mandelbrot Set Equation

<p>
The iteration of the Mandelbrot Set Equation is very simple. We need to set the <img src="https://render.githubusercontent.com/render/math?math=MAX_{iteration}"> to an large number, since we try to simulate the behaviour for <img src="https://render.githubusercontent.com/render/math?math=z_{n\rightarrow\infty}=(z_{n-1})^{2}%2Bc">. Next we need to set a threshold to determine if a number is diverging, for the Mandelbrot Set the threshold is <img src="https://render.githubusercontent.com/render/math?math=4"> with <img src="https://render.githubusercontent.com/render/math?math=\left|c\right|\le\ 4">. Additionaly, we need to implement squaring a Complex Number, therefore we need to implement multiplication for Complex Numbers which is trivial using 2-dimensional vectors.
</p><br>

<div align="center">
  <figure>
    <img src="https://render.githubusercontent.com/render/math?math=(a%2Bbi)\cdot(c%2Bdi)=\left(ac-bd\right)%2B\left(ad%2Bbc\right)i"><br>
    <figcaption>Multiplication for Complex Numbers</figcaption><br>
  </figure>
  <br>
  <figure>
    <img src="https://render.githubusercontent.com/render/math?math=\left(a%2Bbi\right)^{2}=\left(a^{2}-b^{2}\right)%2B 2ab{i}"><br>
    <figcaption>Squaring a Complex Numbers.</figcaption><br>
  </figure>
  <br>
  <figure>
    <img src="https://render.githubusercontent.com/render/math?math=\left|c\right|=|a%2Bbi|=\sqrt{\left(a^{2}\right)%2B\left(b^{2}\right)}"><br>
    <figcaption>The magnitude of a Complex Number</figcaption><br>
  </figure>
  <br>
  <figure>
    <img src="https://render.githubusercontent.com/render/math?math=\left|c\right|\le\ 4\ or\ m_{iterations}=MAX_{iterations}"><br>
    <figcaption>The conditions for the iteration to break</figcaption><br>
  </figure>
  <br>
</div>
<p>
<img src="https://render.githubusercontent.com/render/math?math=m_{iterations}"> is indicating the iteration count for a specific Complex Number. Finishing the iteration we will have two cases, either the iteration determined the Complex Number is diverging or converging, with <img src="https://render.githubusercontent.com/render/math?math=m_{iterations}=MAX_{iterations}"> indicating convergence.
</p>

#### Color

<p>
We can use <img src="https://render.githubusercontent.com/render/math?math=m_{iterations}"> for determining the color of the pixel, since pixel and complex numbers are forming a bijection in our framework.
</p><br>
<div align="center">
  <figure>
    <img src="https://render.githubusercontent.com/render/math?math=color\ =\ \ m_{iterations}<MAX_{iterations}\ ?\ 1\ :\ 0"><br>
    <figcaption>Black & White</figcaption><br>
  </figure>
  <br>
  <figure>
    <img src="https://render.githubusercontent.com/render/math?math=color\ =\ 1-\frac{m_{iterations}}{MAX_{iterations}}"><br>
    <figcaption>Grey</figcaption><br>
  </figure>
  <br>
  <figure>
    <img src="https://render.githubusercontent.com/render/math?math=color\ =\ hsv\left(\frac{m_{iterations}}{MAX_{iterations}},\ 1,\ m_{iterations}<MAX_{iterations}\ ?\ 1\ :\ 0\right)"><br>
    <figcaption>HSV Color</figcaption><br>
  </figure>
  <br>
</div>

<p>
The implementation involves three variations, Black & White, Grey, and HSV Colors. For Black & Whitewe are only checking if the Complex Number converges or diverges. For Grey we take into consideration the rate of divergence, to display grey pixels. And for HSV Colors, we change the base color for divergence to red instead of white, and then for different divergence rates, it will change accordingly around the Color circle. I decided to use HSV Color because it continous, therefore I can use the rate of divergent to determine a color, but also is it pleasant for the Human perception. There are different other methods to display color, like using a Color Palette and mapping areas of rate of divergence for different colors.
</p>

#### Variables

<p>
At this point, the framework is almost complete, we only need to determine the variables for the most pleasant visualization. We could pick boundaries in the region <img src="https://render.githubusercontent.com/render/math?math={a \in\left[-1000,\ -900\right]}, {b \in\left[-1000,\ -900\right]}"> but we would see only divergent Complex Numbers, therefore we need to find good values for the boundaries, width, and height. Through some research in the internet, I found the best values for display the Mandelbrot Set are:
</p>

<div align="center">
  <img src="https://render.githubusercontent.com/render/math?math={a \in\left[-2,\ 1\right]}, {b \in\left[-1,\ 1\right]}"><br>
  <img src="https://render.githubusercontent.com/render/math?math=\frac{width}{height}=\frac{3}{2}">
</div>
<br>

<p>
With this we are able to render the Mandelbrot Set
</p>

#### First Results

<div align="center">
    <figure>
      <img width="500" height="260" src="https://github.com/zobeirhamid/FractalRender/raw/master/docs/images/BlackWhite.png"><br>
      <figcaption>The Mandelbrot Set in Black & White with <img src="https://render.githubusercontent.com/render/math?math=MAX_{iterations}=100"></figcaption>
      <br>
    </figure>
    <figure>
      <img width="500" height="260" src="https://github.com/zobeirhamid/FractalRender/raw/master/docs/images/Grey.png"><br>
      <figcaption>The Mandelbrot Set in Grey Scales with <img src="https://render.githubusercontent.com/render/math?math=MAX_{iterations}=100"></figcaption>
      <br>
    </figure>
    <figure>
      <img width="500" height="260" src="https://github.com/zobeirhamid/FractalRender/raw/master/docs/images/Color.png"><br>
      <figcaption>The Mandelbrot Set in Color with <img src="https://render.githubusercontent.com/render/math?math=MAX_{iterations}=100"></figcaption>
      <br>
    </figure>
    <figure>
      <img width="500" height="260" src="https://github.com/zobeirhamid/FractalRender/raw/master/docs/images/Iteration1000.png"><br>
      <figcaption>The Mandelbrot Set in Color with <img src="https://render.githubusercontent.com/render/math?math=MAX_{iterations}=1000"></figcaption>
      <br>
    </figure>
</div>

### Optimizations

#### Optimized Escape Algorithm

The described algorithm above works, but it is very inefficient since we are using five multiplications inside the iterations loop, since multiplying two complex numbers involves in our case 3 multiplications and calculating the magnitude of a complex number involves 2 more multiplications. There is the optimized escape algorithm which is more efficient since it using only three multiplications.

First, we observe that calculating the magnitude of a Complex Numbers involves calculating the real numbers <img src="https://render.githubusercontent.com/render/math?math=a^{2}"> and <img src="https://render.githubusercontent.com/render/math?math=b^{2}">. For calculating the Mandelbrot Set Equation we have to square a Complex Number which also involves <img src="https://render.githubusercontent.com/render/math?math=a^{2}"> and <img src="https://render.githubusercontent.com/render/math?math=b^{2}">, therefore saving those two real numbers in separate variables, we can save 2 multiplications.

### Continous (Smooth) Coloring

Looking at the Mangelbrot Set in color, we can observe that the colors are not smoothly transitioning, since the different color regions are identifiable. This is a form of aliasing since the colors should be distributed continously over the space, since the Complex Space is continous, but we are working on a discrete space which is bounded by a width and height, therefore we have to work around that. The main idea to fix the aliasing is by normalizing the iteration count, therefore we have a more even distribution, so we artificially create a continous transition between colors. To implement the artificial continous transition we need to change the old breaking condition since we wanna get bigger values of <img src="https://render.githubusercontent.com/render/math?math=m_{iterations}"> for divergent areas, therefore it is necessary to enforce a bigger divergence criterium. For normalizing the <img src="https://render.githubusercontent.com/render/math?math=m_{iterations}">, we can use a potential function.

#### Equations

<div align="center">
  <figure>
    <img src="https://render.githubusercontent.com/render/math?math=x^{2}+y^{2}>2^{8}"><br>
    <figcaption>New Divergence Criterium</figcaption><br>
  </figure>
  <br>
  <figure>
    <img src="https://render.githubusercontent.com/render/math?math=\phi\left(z\right)=\lim_{n\to\infty}\frac{\log\left|z\right|}{P^{n}},\ P:\ f\left(z\right)=z^{p}+c">
   <figcaption>Potentional Function</figcaption><br> 
  </figure>
  <br>
  <figure>
    <img src="https://render.githubusercontent.com/render/math?math=m_{last}\ge MAX_{iterations}"><br>
    <figcaption>Condition for normalizing</figcaption><br>
  </figure>
  <br>
  <figure>
    <img src="https://render.githubusercontent.com/render/math?math=m_{iterations}=m_{last}%2B1.0-\left(\frac{\log\left(\frac{\log\left(a^{2}%2Bb^{2}\right)}{2}\right)}{\log\left(2\right)^{2}}\right)"><br>
    <figcaption>Normalized <img src="https://render.githubusercontent.com/render/math?math=m_{iterations}"></figcaption><br>
  </figure>
</div>

#### Result

<div align="center">
    <figure>
      <img width="500" height="260" src="https://github.com/zobeirhamid/FractalRender/raw/master/docs/images/smooth.png"><br>
      <figcaption>The Mandelbrot Set in Color with smooth transitions and <img src="https://render.githubusercontent.com/render/math?math=MAX_{iterations}=100"></figcaption><br>
    </figure>
    <figure>
      <img width="500" height="260" src="https://github.com/zobeirhamid/FractalRender/raw/master/docs/images/Iteration1000Smooth.png"><br>
      <figcaption>The Mandelbrot Set in Color with smooth transitions <img src="https://render.githubusercontent.com/render/math?math=MAX_{iterations}=1000"></figcaption><br>
    </figure>
</div>

<p>
This method is really good for small <img src="https://render.githubusercontent.com/render/math?math=MAX_{iterations}">, but don't really change anything for high <img src="https://render.githubusercontent.com/render/math?math=MAX_{iterations}"> since the the pixel depth is more dense which means the neighbourhood pixels cannot have as different divergence rates since more iterations are allowed.
</p>

### Linear Interpolation

The last optimization we can do is interpolating the colors for the current <img src="https://render.githubusercontent.com/render/math?math=m_{iterations}"> and <img src="https://render.githubusercontent.com/render/math?math=m_{iterations} + 1">. This is combination is not desirable for low <img src="https://render.githubusercontent.com/render/math?math=MAX_{iterations}">, but gives more detail if <img src="https://render.githubusercontent.com/render/math?math=MAX_{iterations}"> is very big like <img src="https://render.githubusercontent.com/render/math?math=MAX_{iterations}=1000">.

#### Result

<div align="center">
    <figure>
      <img width="500" height="260" src="https://github.com/zobeirhamid/FractalRender/raw/master/docs/images/interpolated.png"><br>
      <figcaption>Interpolated version of the Mandelbrot Set with <img src="https://render.githubusercontent.com/render/math?math=MAX_{iterations}=100"></figcaption>
      <br>
    </figure>
    <figure>
      <img width="500" height="260" src="https://github.com/zobeirhamid/FractalRender/raw/master/docs/images/Iteration1000Interpolated.png"><br>
      <figcaption>Interpolated version of the Mandelbrot Set with <img src="https://render.githubusercontent.com/render/math?math=MAX_{iterations}=100"></figcaption>
    <br>
    </figure>
</div>

### Interactions

<p>
Since we rendered the Mandelbrot Set using our GPU, we should try implementing some CPU operations to interact with it. I will implement the three interactions zooming, dragging, and resizing.
They are all straightforward using Javascript since we have mouse events which we can listen to and then apply the action we want by computing the new boundaries. I will not go in detail of how I implemented those functions, but I give the mathematical equations to compute the new boundaries.
</p>

<div align="center">
  <figure>
    <img src="https://render.githubusercontent.com/render/math?math=x_{0} = x_{0}%2B\frac{x}{width}\cdot\left(x_{1}-x_{0}\right)\cdot0.05_{zoomfactor}"><br>
    <img src="https://render.githubusercontent.com/render/math?math=x_{1} = x_{0}-\left(1-\frac{x}{width}\right)\cdot\left(x_{1}-x_{0}\right)\cdot0.05_{zoomfactor}"><br>
    <img src="https://render.githubusercontent.com/render/math?math=y_{0} = y_{0}%2B\left(1-\frac{y}{height}\right)\cdot\left(y_{1}-y_{0}\right)\cdot0.05_{zoomfactor}"><br>
    <img src="https://render.githubusercontent.com/render/math?math=y_{1} = y_{1}-\frac{y}{height}\cdot\left(y_{1}-y_{0}\right)\cdot0.05_{zoomfactor}"><br>
    <figcaption>Zoom</figcaption><br>
  </figure>
  <br>
  <figure>
    <img src="https://render.githubusercontent.com/render/math?math=x_{0}=x_{0}%2B\frac{\left(x_{current}-x_{previous}\right)\left(x_{1}-x_{0}\right)}{width}"><br>
    <img src="https://render.githubusercontent.com/render/math?math=x_{1}=x_{1}%2B\frac{\left(x_{current}-x_{previous}\right)\left(x_{1}-x_{0}\right)}{width}"><br>
    <img src="https://render.githubusercontent.com/render/math?math=y_{0}=y_{0}-\frac{\left(y_{current}-y_{previous}\right)\left(y_{1}-y_{0}\right)}{height}"><br>
    <img src="https://render.githubusercontent.com/render/math?math=y_{1}=y_{1}-\frac{\left(y_{current}-y_{previous}\right)\left(y_{1}-y_{0}\right)}{height}"><br>
    <figcaption>Dragging</figcaption><br>
  </figure>
  <br>
  <figure>
    <img src="https://render.githubusercontent.com/render/math?math=x_{0}=x_{0}-\left(\frac{\left(width_{new}-width_{old}\right)\cdot\left(x_{1}-x_{0}\right)}{2\cdot width_{old}}\right)"><br>
    <img src="https://render.githubusercontent.com/render/math?math=x_{1}=x_{1}%2B\left(\frac{\left(width_{new}-width_{old}\right)\cdot\left(x_{1}-x_{0}\right)}{2\cdot width_{old}}\right)"><br>
    <img src="https://render.githubusercontent.com/render/math?math=y_{0}=y_{0}-\left(\frac{\left(height_{new}-height_{old}\right)\cdot\left(y_{1}-y_{0}\right)}{2\cdot height_{old}}\right)"><br>
    <img src="https://render.githubusercontent.com/render/math?math=y_{1}=y_{1}%2B\left(\frac{\left(height_{new}-height_{old}\right)\cdot\left(y_{1}-y_{0}\right)}{2\cdot height_{old}}\right)"><br>
    <figcaption>Resizing</figcaption><br>
  </figure>
  <br>
</div>

<p>
Now we can interact with the Mandelbrot Set and render even more interesting parts of it.
</p>
<br>
<div align="center">
  <figure>
    <img width="500" height="260" src="https://github.com/zobeirhamid/FractalRender/raw/master/docs/images/zoomed.png"><br>
    <figcaption>The Mandelbrot Set zoomed in Grey Scale</figcaption>
  </figure>
</div>

### Animations

<p>
Let's have some fun with animations and investigate how the Mandelbrot Set is created by animating the <img src="https://render.githubusercontent.com/render/math?math=MAX_{iteration}"> starting from <img src="https://render.githubusercontent.com/render/math?math=0"> to for example <img src="https://render.githubusercontent.com/render/math?math=100">. I decided to create a dynamic state which holds all the variables we have to set, and when they get updated we redraw the canvas with the WebGL context. Since we somehow have to start the animation, I decided to include React to the application for creating a GUI which allows to change all the variables, change between colors, and even save the rendered Mandelbrot Set as an image.
</p>

<p>
The animations are very simple in nature. We set <img src="https://render.githubusercontent.com/render/math?math=MAX_{iteration}"> to <img src="https://render.githubusercontent.com/render/math?math=0">. Then we draw, increment <img src="https://render.githubusercontent.com/render/math?math=MAX_{iteration}"> by 1, and draw again, and increment again. This process is recursive and terminated if <img src="https://render.githubusercontent.com/render/math?math=MAX_{iteration}"> reaches a set threshold, in my case <img src="https://render.githubusercontent.com/render/math?math=100">.
</p>

## Problems encountered

### First Problem

<p>
I encountered two problems. The first problem was that I wanted to render the Mandelbrot Set on the whole Screen, therefore using instead of using predefined I want to use dynamic values. The problem is not finding the display width and height, it is that the aspect ratio needs to be <img src="https://render.githubusercontent.com/render/math?math=\frac{width}{height}=\frac{3}{2}">, but what if a display does not have those aspect ratio? Then the Mandelbrot Set will looked skewed. To solve the problem we need to define the height based on the ratio and the width.
</p>
<div align="center">
  <figure>
    <img src="https://render.githubusercontent.com/render/math?math=height=\frac{2}{3}\cdot width"><br>
  </figure>
  <br>
</div>

<p>
Unfortunately, there are cases in which the new height is bigger than the device height, for that case we need to define the width based on the height and aspect ratio.
</p>
<div align="center">
  <figure>
    <img src="https://render.githubusercontent.com/render/math?math=width=\frac{3}{2}\cdot height"><br>
  </figure>
</div>

### Second Problem

<p>
If we have a high <img src="https://render.githubusercontent.com/render/math?math=MAX_{iteration}">, and the Complex Number is diverging, but at a high <img src="https://render.githubusercontent.com/render/math?math=m_{iteration}">, then the color will be not distinguishable to its surrounding area, which results into aliasing. The solution to that is creating a histogram and assign colors based on the distribution of <img src="https://render.githubusercontent.com/render/math?math=m_{iteration}">. Unfortunately, WebGL does not allow for dynamic array, therefore setting an array based on the <img src="https://render.githubusercontent.com/render/math?math=width*height"> will not be technical possible which ultimately showed me the limitation of WebGL.
</p>

<div align="center">
  <figure>
    <img width="500" height="260" src="https://github.com/zobeirhamid/FractalRender/raw/master/docs/images/limitation.png"><br>
    <figcaption><img src="https://render.githubusercontent.com/render/math?math=MAX_{iteration}=1000, sampleRate=8^{2}, zoomed"></figcaption><br>
  </figure>
</div>

## Take away

<p>
I learned a lot through out in this project, starting from setting up a graphic's pipeline, connecting it to a GUI, and animating using the CPU.<br>
But the most important lesson I learned was finding out about the limitation of technologies.
</p>

## Results

### Images

<div align="center">
  <figure>
    <img width="500" height="260" src="https://github.com/zobeirhamid/FractalRender/raw/master/docs/images/high_iteration.png"><br>
    <figcaption><img src="https://render.githubusercontent.com/render/math?math=MAX_{iteration}=1000, sampleRate=4^{2}"></figcaption><br>
  </figure>
  <figure>
    <img width="500" height="260" src="https://github.com/zobeirhamid/FractalRender/raw/master/docs/images/high_iteration_zoom.png"><br>
    <figcaption>
      <img src="https://render.githubusercontent.com/render/math?math=MAX_{iteration}=1000, sampleRate=4^{2}, zoomed"> 
    </figcaption><br>
  </figure>
  <figure>
    <img width="500" height="260" src="https://github.com/zobeirhamid/FractalRender/raw/master/docs/images/resultGrey.png"><br>
    <figcaption>
      <img src="https://render.githubusercontent.com/render/math?math=MAX_{iteration}=1000, sampleRate=4^{2}, zoomed"> 
    </figcaption><br>
  </figure>
</div>

### Animations

<div align="center">
  <figure>
    <img width="500" height="260" src="https://github.com/zobeirhamid/FractalRender/blob/master/docs/videos/gifs/IterationAnimation.gif?raw=true"><br>
    <figcaption>Animation of incrementing <img src="https://render.githubusercontent.com/render/math?math=MAX_{iteration}"> by 1 for each frame</figcaption><br>
  </figure>
  <figure>
    <img width="500" height="260" src="https://github.com/zobeirhamid/FractalRender/blob/master/docs/videos/gifs/ThresholdAnimation.gif?raw=true"><br>
    <figcaption>Animation of incrementing <img src="https://render.githubusercontent.com/render/math?math=MAX_{threshold}"> by 0.01 for each frame</figcaption><br>
  </figure>
</div>

## Resources

<a href="https://en.wikipedia.org/wiki/Fractal">Fractal</a><br>
<a href="https://en.wikipedia.org/wiki/Mandelbrot_set">
Mandelbrot Set
</a><br>
<a href="https://en.wikipedia.org/wiki/Plotting_algorithms_for_the_Mandelbrot_set">
Plotting algorithms for the Mandelbrot Set
</a><br>
<a href="https://www.codingame.com/playgrounds/2358/how-to-plot-the-mandelbrot-set/mandelbrot-set">
Plotting the Mandelbrot Set in Python
</a><br>
<a href="https://github.com/chrizbee/NewtonFractal">NewtonFractal in WebGL</a><br>
