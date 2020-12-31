/// <reference types="react-scripts" />

declare module "*.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}