const makeName = (name, to) => { return [name, to].sort().join('_'); }

const Subscription = {
  message: {
    subscribe: (parent, { from, to }, { pubsub }) => {
      const chatBoxName = makeName(from, to);
      // console.log("sub: ", chatBoxName);
      return pubsub.subscribe(`chatBox ${chatBoxName}`);
    },
  },
};

export { Subscription as default };
