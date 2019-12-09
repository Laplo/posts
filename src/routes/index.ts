import { Router } from 'express';
import PostRouter from './Posts';
import ReactionRouter from './Reactions';
import {KeycloakMiddleware} from '../shared/Keycloak';

// Init router and path
const router = Router();
const keycloak = KeycloakMiddleware.getInstance();
// Add sub-routes
const usingMockDb = (process.env.USE_MOCK_DB || '').toLowerCase();
if (usingMockDb === 'true') {
    router.use('', PostRouter);
    router.use('/reactions', ReactionRouter);
} else {
    router.use('', keycloak.protect(), PostRouter);
    router.use('/reactions', keycloak.protect(), ReactionRouter);
}

// Export the base-router
export default router;
