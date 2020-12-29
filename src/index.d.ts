/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// declare module '*.module.scss' {
declare module "*.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}