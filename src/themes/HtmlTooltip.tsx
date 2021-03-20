import { Theme, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react'

const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
    },
  }))(Tooltip);

export default HtmlTooltip
