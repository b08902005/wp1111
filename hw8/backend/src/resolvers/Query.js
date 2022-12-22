const makeName = (name, to) => { return [name, to].sort().join('_'); }

const Query = {
  chatbox: async (parent, { name1, name2 }, { ChatBoxModel }) => {
    if (!name1 || !name2) {
      return
    }
    const name = makeName(name1, name2);
    let box = await ChatBoxModel.findOne({ name });
    if (!box)
      return null
    return box;
  },
};
export default Query;