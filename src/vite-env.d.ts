// / <reference types="vite/client" />

declare module 'react-cookies'


declare module '*.jpg' {
    const src: string;
    export default src;
  }
  
declare module '*.png' {
    const src: string;
    export default src;
  }


  declare module '*.svg' {
    import * as React from 'react';
  
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  
    const src: string;
    export default src;
  }
  
  declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }
  
  declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
  }
  
  declare module '*.module.sass' {
    const classes: { [key: string]: string };
    export default classes;
  }
  
  declare module '*.module.less' {
    const classes: { [key: string]: string };
    export default classes;
  }

  
  