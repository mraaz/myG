import { forceString, forceBoolean } from './primitives';

export default class ProfileSchema {
  constructor(data) {
    this.set(data);
  }

  set(data) {
    if (data.loading !== undefined) this.loading = forceBoolean(data.loading);
    if (data.error !== undefined) this.error = forceString(data.error);
    if (data.alias !== undefined) this.alias = forceString(data.alias);
    if (data.isSelf !== undefined) this.isSelf = forceBoolean(data.isSelf);
    if (data.isFriend !== undefined) this.isFriend = forceBoolean(data.isFriend);
    if (data.isFollower !== undefined) this.isFollower = forceBoolean(data.isFollower);
  }
}

