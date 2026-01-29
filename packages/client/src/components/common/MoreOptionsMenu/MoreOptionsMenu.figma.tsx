import figma from '@figma/code-connect';
import { MoreOptionsMenu, MenuItem } from './MoreOptionsMenu';

figma.connect(MoreOptionsMenu, 'https://www.figma.com/design/7QW0kJ07DcM36mgQUJ5Dtj/Carton-Case-Management?node-id=1179-62911&m=dev', {
  example: () => (
    <MoreOptionsMenu>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Share</MenuItem>
      <MenuItem destructive>Delete Case</MenuItem>
    </MoreOptionsMenu>
  ),
});


