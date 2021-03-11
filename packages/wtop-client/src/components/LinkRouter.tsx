import { Link, LinkProps } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

export interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps): React.ReactElement => (
  <Link {...props} component={RouterLink} />
);

export default LinkRouter;
