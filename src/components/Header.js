import React from 'react';
import {Menu, Button, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default() => {
    return(
        <Menu stackable style={{marginTop: '50px'}}>
            <Button color='blue' as={Link} to='/'>Marketplace</Button>
            <Button color='green' as={Link} to='/NewURI'>Modify URI</Button>
            <Button color='yellow' as={Link} to='/oracle'>Oracle</Button>
        </Menu>
    );
}