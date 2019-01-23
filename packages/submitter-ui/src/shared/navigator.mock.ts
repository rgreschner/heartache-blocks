import * as sinon from "sinon";

const USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36";

/**
 * Mockup for window.navigator.
 */
(global as any).navigator = {
	userAgent: USER_AGENT
};
