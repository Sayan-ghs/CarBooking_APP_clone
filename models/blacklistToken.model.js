const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
        token: {
                type: String,
                required: true,
                unique: true
        },
        expiresAt: {
                type: Date,
                required: true,
                default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
        }
});
// TTL : Time To Leave

// Automatically remove expired tokens
blacklistTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);