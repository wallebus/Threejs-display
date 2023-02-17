 /*matrix*/
uniform vec2 uFrequency;
uniform float uTime;

/*vector*/

/*vary*/
varying vec2 vuv;

void main()
{
    vuv = uv;

    vec4 modelPosition = modelMatrix*vec4(position,1.0);
    vec4 viewPosition = viewMatrix*modelPosition;
    vec4 projection =projectionMatrix*viewPosition;

     gl_Position = projection;
}