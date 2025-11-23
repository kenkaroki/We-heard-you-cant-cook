const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "cantcook/_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.6LGPKzUU.js",app:"_app/immutable/entry/app.DduDrvve.js",imports:["_app/immutable/entry/start.6LGPKzUU.js","_app/immutable/chunks/gV453DVY.js","_app/immutable/chunks/BKvKnRH6.js","_app/immutable/chunks/Cu-A44Aw.js","_app/immutable/chunks/BttVn3x6.js","_app/immutable/entry/app.DduDrvve.js","_app/immutable/chunks/BKvKnRH6.js","_app/immutable/chunks/P7GjCC45.js","_app/immutable/chunks/AP3DqHb2.js","_app/immutable/chunks/Dt4gHaz-.js","_app/immutable/chunks/BttVn3x6.js","_app/immutable/chunks/huJ-UwZ7.js","_app/immutable/chunks/B19PXVM3.js","_app/immutable/chunks/CHUraCEX.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-PAbgaGfX.js')),
			__memo(() => import('./chunks/1-7tT1L-ZO.js')),
			__memo(() => import('./chunks/2-BZmNZkt5.js')),
			__memo(() => import('./chunks/3-BCbNrlB-.js')),
			__memo(() => import('./chunks/4-B_mjpR3f.js')),
			__memo(() => import('./chunks/5-B3malAut.js')),
			__memo(() => import('./chunks/6-Ba2z5vrn.js')),
			__memo(() => import('./chunks/7-CkV2XUTf.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/account",
				pattern: /^\/account\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/recipes",
				pattern: /^\/recipes\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/signup",
				pattern: /^\/signup\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "/cantcook";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
