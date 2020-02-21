import { sidebarConstants } from '../_constants';

export const sidebarActions = {
    toggle
};

function toggle(status) {
    return { type: sidebarConstants.SIDECLASS, status };
}