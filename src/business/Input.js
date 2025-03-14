export const Action = {
  Left: "Left",
  FastDrop: "FastDrop",
  Right: "Right",
  Rotate: "Rotate",
  SlowDrop: "SlowDrop"
};

export const Key = {
  ArrowUp: Action.Rotate,
  ArrowDown: Action.SlowDrop,
  ArrowLeft: Action.Left,
  ArrowRight: Action.Right,
  Space: Action.FastDrop
};

export const actionIsDrop = (action) =>
  [Action.SlowDrop, Action.FastDrop].includes(action);

export const actionForKey = (keyCode) => Key[keyCode];
