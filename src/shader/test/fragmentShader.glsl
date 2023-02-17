

varying vec2 vuv;

void main()
{
    /* 边缘部分若高于0.5则为1 低于0.5则为0*/
    float strength =  step(0.4,mod(vuv.x*10.0-0.2,1.0)) * step(0.8,mod(vuv.y*10.0,1.0));
     strength +=  step(0.8,mod(vuv.x*10.0,1.0)) * step(0.4,mod(vuv.y*10.0-0.2,1.0));

    vec4 uvColor = vec4 (vec3(strength),1.0);
    gl_FragColor = uvColor;
}
