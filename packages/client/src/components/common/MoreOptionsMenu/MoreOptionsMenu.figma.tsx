import figma from '@figma/code-connect';
import { MoreOptionsMenu, MenuItem } from './MoreOptionsMenu';
import { Trash2 } from 'lucide-react';

figma.connect(MoreOptionsMenu, 'https://www.figma.com/design/7QW0kJ07DcM36mgQUJ5Dtj/Carton-Case-Management?node-id=1179-62911&m=dev', {
  example: () => (
    <MoreOptionsMenu>
        <MenuItem icon={<Trash2 />}>Delete</MenuItem>
    </MoreOptionsMenu>
  ),
});


