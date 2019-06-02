import React, { forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';

const LinkAdapter = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <Link innerRef={ref as any} {...props} />
));

export default LinkAdapter;
