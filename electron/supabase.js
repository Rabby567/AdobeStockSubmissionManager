const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://zcnsmxkccemikoavjhor.supabase.co",
  "sb_publishable_2TD6o1lWpANvr5xWaOraqw_-rY51Rx8"
);

module.exports = supabase;