import { useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import AppBar from './AppBar.tsx';
import Auth from '../entities/User/ui/Auth.tsx';
import { UserType } from '../entities/User/model/userType.ts';
import Todos from '../entities/Todo/ui/Todos.tsx';
import { autoLogin } from '../shared/util/autoLogin.ts';

function App() {
	const userFromLS = autoLogin();
	const [user, setUser] = useState<UserType | null>(userFromLS);

	return (
		<>
			<AppBar username={user?.username} />
			<div style={{ marginTop: '100px' }} />
			{user ? <Todos /> : <Auth setUser={setUser} />}
		</>
	);
}

export default App;
