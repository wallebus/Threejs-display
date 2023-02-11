uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;  /*matrix*/

attribute vec3 position;   /*vector*/
attribute float mRandom;

varying float vRandom;

void main()
{
    vRandom = mRandom;

    vec4 modelPosition = modelMatrix*vec4(position,1.0);
    // modelPosition.z += sin(modelPosition.x * 6.0) * 0.1;
    modelPosition.z += mRandom *0.15;

    vec4 viewPosition = viewMatrix*modelPosition;
    vec4 projection =projectionMatrix*viewPosition;

     gl_Position = projection;
}