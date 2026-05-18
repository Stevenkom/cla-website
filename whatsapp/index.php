<?php
// ================================================================
// ✝️  CHURCH LIFE AFRICA — WhatsApp Sender
// ================================================================
// SETUP:
//  1. Upload this file to your cPanel public_html folder
//     or a subfolder e.g. public_html/whatsapp/
//  2. Set your Fonnte token below
//  3. Visit https://churchlifeafrica.org/whatsapp/cla_whatsapp.php
//     (or wherever you uploaded it)
//  4. Use the form to send messages
//
// SECURITY: This page is password protected.
// Change the password below before uploading!
// ================================================================

// ── CONFIGURATION ───────────────────────────────────────────────
define('FONNTE_TOKEN',  '37uqxQidpVSSUfbAg4BA'); // ← Your Fonnte token
define('PAGE_PASSWORD', 'Churchlife#001');              // ← Change this password!
define('SEND_DELAY',    3);                       // seconds between messages
define('MAX_PER_RUN',   50);                      // max messages per run (safety)
// ────────────────────────────────────────────────────────────────

// ── ALL 897 CLA MEMBERS ─────────────────────────────────────────
// Format: [name, phone, tribe, diocese, state]
$members = [
  ["Nkom Stephen","09032616981","The Innovators Circle","Archdiocese of Abuja","Federal Capital Territory (FCT) – Abuja"],
//   ["Jude Bisong","08118886844","The Faith Explorers","Archdiocese of Abuja","Federal Capital Territory (FCT) – Abuja"],
//   ["Chukwu Amarachi Rita","09078696719","","Diocese of Lafia","Nasarawa"],
//   ["Aki Igbawase peter","08134612875","The Culture Creators","Diocese of Makurdi","Benue"],
//   ["Willy-Duru MaryJane Chidiuto","09038189804","The Culture Creators","Archdiocese of Abuja","Federal Capital Territory (FCT) – Abuja"],
//   ["Tyosue Christopher Kpega","07030225444","The Faith Explorers","Diocese of Zaria","Kaduna"],
//   ["Nzeadibenma Nneoma Jane","08060097881","The Faith Explorers","Diocese of Aba","Rivers"],
//   ["Hope Gregory Yusuf","08038438060","The Service Builders","Archdiocese of Kaduna","Kaduna"],
//   ["Hange Amanda Wuese","08160936898","The Service Builders","Archdiocese of Abuja","Federal Capital Territory (FCT) – Abuja"],
//   ["Seth Bobai Andrew","08138721956","The Faith Explorers","Diocese of Kafanchan","Kaduna"],
//   ["Madu Joy Nmesoma","09065347797","The Service Builders","Diocese of Onitsha","Anambra"],
//   ["Nebo Ifeoma vera","07031316626","The Service Builders","Archdiocese of Abuja","Federal Capital Territory (FCT) – Abuja"],
//   ["Akpai Ocholi","08065492248","The Service Builders","Diocese of Lokoja","Kogi"],
//   ["Francis Emmanuel Nwankwo","07067169064","The Innovators Circle","Diocese of Katsina","Katsina"],
//   ["Ocheje Isaac Ojonugwa","09060675713","The Culture Creators","Diocese of Lokoja","Kogi"],
//   ["Moses Bako","06068787756","The Service Builders","Archdiocese of Kaduna","Kaduna"],
//   ["Joy Stephanie","08094133326","The Service Builders","Archdiocese of Abuja","Federal Capital Territory (FCT) – Abuja"],
//   ["ILIYA Kambai Dennis","08133161065","The Culture Creators","Diocese of Kafanchan","Kaduna"],
//   ["Paul Mnongu Kpega Ansua","08140626873","The Culture Creators","Archdiocese of Abuja","Federal Capital Territory (FCT) – Abuja"],
//   ["Uche Somtochukwu Vivian","08167205340","The Culture Creators","Diocese of Nnewi","Anambra"],
//   ["Paul Oloche","07042756002","The Service Builders","Diocese of Lafia","Nasarawa"],
//   ["Bamidele Awodeyi","08066437576","","Diocese of Katsina","Katsina"],
//   ["Ezendidika Angela Nnebuife","08032473787","The Culture Creators","Diocese of Awka","Anambra"],
//   ["Rita Ifechukwu Mokwe","08101930319","The Service Builders","Archdiocese of Abuja","Federal Capital Territory (FCT) – Abuja"],
//   ["Jonah Matthew","09057539330","The Service Builders","Archdiocese of Abuja","Kaduna"],
//   ["Nyitamen Antse Emmanuel","08060354276","","Archdiocese of Abuja","Federal Capital Territory (FCT) – Abuja"],
//   ["Asika Ifeanyi Emmanuel","07030875682","The Service Builders","Archdiocese of Abuja","Federal Capital Territory (FCT) – Abuja"],
//   ["Samson Jude-Charismaria","08112065299","The Faith Explorers","Diocese of Auchi","Edo"],
//   ["Kaki Emmanuel Martins","07036989844","The Innovators Circle","Diocese of Ilorin","Kwara"],
//   ["Judith Laphilai Maikaho","08101165178","The Culture Creators","Diocese of Bauchi","Gombe"],
// ];

// ── SESSION / AUTH ───────────────────────────────────────────────
session_start();
$error   = '';
$success = '';
$results = [];

if (isset($_POST['logout'])) {
  $_SESSION['cla_auth'] = false;
  header("Location: " . $_SERVER['PHP_SELF']);
  exit;
}

if (isset($_POST['password'])) {
  if ($_POST['password'] === PAGE_PASSWORD) {
    $_SESSION['cla_auth'] = true;
  } else {
    $error = 'Incorrect password. Please try again.';
  }
}

$authed = !empty($_SESSION['cla_auth']);

// ── SEND LOGIC ───────────────────────────────────────────────────
if ($authed && isset($_POST['send'])) {
  $message    = trim($_POST['message'] ?? '');
  $filter     = $_POST['filter']     ?? 'all';
  $filterVal  = trim($_POST['filter_value'] ?? '');

  if (empty($message)) {
    $error = 'Please enter a message.';
  } else {
    $sent = 0; $failed = 0; $skipped = 0;

    foreach ($members as $m) {
      if ($sent >= MAX_PER_RUN) break;

      $name    = $m[0];
      $phone   = cleanPhone($m[1]);
      $tribe   = $m[2];
      $diocese = $m[3];
      $state   = $m[4];

      if (!$phone) { $skipped++; continue; }

      // Apply filter
      if ($filter === 'tribe'   && strtolower($tribe)   !== strtolower($filterVal)) { $skipped++; continue; }
      if ($filter === 'diocese' && strtolower($diocese) !== strtolower($filterVal)) { $skipped++; continue; }
      if ($filter === 'state'   && strtolower($state)   !== strtolower($filterVal)) { $skipped++; continue; }

      // Build personalised message
      $firstName  = explode(' ', $name)[0];
      $finalMsg   = str_replace(
        ['{name}', '{tribe}', '{diocese}', '{state}'],
        [$firstName, $tribe, $diocese, $state],
        $message
      );

      // Send via Fonnte
      $result = sendWhatsApp($phone, $finalMsg);
      if ($result['ok']) {
        $sent++;
        $results[] = ['status' => 'ok',   'name' => $name, 'phone' => $phone];
      } else {
        $failed++;
        $results[] = ['status' => 'fail', 'name' => $name, 'phone' => $phone, 'error' => $result['error']];
      }

      if ($sent < MAX_PER_RUN) sleep(SEND_DELAY);
    }

    $success = "Done! Sent: $sent | Failed: $failed | Skipped: $skipped";
  }
}

// ── HELPER FUNCTIONS ─────────────────────────────────────────────
function sendWhatsApp($phone, $message) {
  $url  = 'https://api.fonnte.com/send';
  $data = http_build_query([
    'target'  => $phone,
    'message' => $message,
    'delay'   => 2,
  ]);

  $opts = [
    'http' => [
      'method'  => 'POST',
      'header'  => "Authorization: " . FONNTE_TOKEN . "\r\n" .
                   "Content-Type: application/x-www-form-urlencoded\r\n",
      'content' => $data,
      'ignore_errors' => true,
    ]
  ];

  $resp = file_get_contents($url, false, stream_context_create($opts));
  if ($resp === false) return ['ok' => false, 'error' => 'Connection failed'];

  $json = json_decode($resp, true);
  if (!empty($json['status'])) return ['ok' => true];
  return ['ok' => false, 'error' => $json['reason'] ?? 'Unknown error'];
}
function cleanPhone($raw) {
  $p = preg_replace('/\D/', '', $raw);
  if (strlen($p) < 7) return '';
  if (substr($p, 0, 3) === '234' && strlen($p) >= 13) return '0' . substr($p, 3);
  if (substr($p, 0, 1) === '0'   && strlen($p) === 11) return $p;
  if (strlen($p) === 10) return '0' . $p;
  return $p;
}

// Get unique values for filter dropdowns
function getUnique($members, $idx) {
  $vals = array_unique(array_filter(array_column($members, $idx)));
  sort($vals);
  return $vals;
}
$tribes   = getUnique($members, 2);
$dioceses = getUnique($members, 3);
$states   = getUnique($members, 4);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>✝️ CLA WhatsApp Sender</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Segoe UI', sans-serif;
    background: #f0f4f0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
  }
  .container {
    background: #fff;
    border-radius: 16px;
    padding: 2.5rem;
    width: 100%;
    max-width: 620px;
    border: 1px solid #d4e4d4;
  }
  .logo {
    text-align: center;
    margin-bottom: 2rem;
  }
  .logo h1 {
    font-size: 22px;
    color: #1A6B35;
    font-weight: 600;
    margin-top: 8px;
  }
  .logo p {
    font-size: 13px;
    color: #888;
    margin-top: 4px;
  }
  label {
    display: block;
    font-size: 13px;
    font-weight: 600;
    color: #444;
    margin-bottom: 6px;
    margin-top: 16px;
  }
  input[type=password], select, textarea {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid #d0d0d0;
    border-radius: 8px;
    font-size: 14px;
    color: #333;
    background: #fafafa;
    outline: none;
    transition: border-color 0.2s;
  }
  input[type=password]:focus,
  select:focus,
  textarea:focus { border-color: #1A6B35; background: #fff; }
  textarea { resize: vertical; min-height: 120px; line-height: 1.6; }
  .hint {
    font-size: 12px;
    color: #999;
    margin-top: 4px;
  }
  .btn {
    display: block;
    width: 100%;
    padding: 13px;
    background: #1A6B35;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 24px;
    transition: background 0.2s;
  }
  .btn:hover { background: #155a2b; }
  .btn:disabled { background: #aaa; cursor: not-allowed; }
  .btn-logout {
    background: transparent;
    color: #999;
    border: 1px solid #ddd;
    font-size: 13px;
    padding: 7px 16px;
    border-radius: 6px;
    cursor: pointer;
    float: right;
    margin-top: -8px;
  }
  .alert {
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .alert-error   { background: #fff0f0; color: #c0392b; border: 1px solid #f5c6c6; }
  .alert-success { background: #f0fff4; color: #1A6B35; border: 1px solid #b2dfcc; }
  .results {
    margin-top: 20px;
    max-height: 240px;
    overflow-y: auto;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  }
  .result-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 14px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 13px;
  }
  .result-row:last-child { border-bottom: none; }
  .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .dot-ok   { background: #1A6B35; }
  .dot-fail { background: #e74c3c; }
  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin: 16px 0;
  }
  .stat {
    background: #f8f8f8;
    border-radius: 8px;
    padding: 12px;
    text-align: center;
  }
  .stat-num { font-size: 22px; font-weight: 700; color: #1A6B35; }
  .stat-label { font-size: 11px; color: #999; margin-top: 2px; }
  .divider { border: none; border-top: 1px solid #eee; margin: 24px 0; }
  .filter-row { display: flex; gap: 10px; }
  .filter-row select { flex: 1; }
  .filter-row select:first-child { max-width: 160px; }
  .member-count {
    font-size: 12px;
    color: #1A6B35;
    background: #f0fff4;
    border: 1px solid #b2dfcc;
    border-radius: 6px;
    padding: 6px 12px;
    margin-top: 8px;
    display: inline-block;
  }
  .cross { font-size: 28px; color: #1A6B35; }
</style>
</head>
<body>
<div class="container">

  <div class="logo">
    <div class="cross">✝</div>
    <h1>Church Life Africa</h1>
    <p>WhatsApp Message Sender</p>
  </div>

  <?php if (!$authed): ?>
  <!-- LOGIN FORM -->
  <?php if ($error): ?>
    <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
  <?php endif; ?>
  <form method="POST">
    <label>Enter Password to Continue</label>
    <input type="password" name="password" placeholder="Password" autofocus required>
    <button type="submit" class="btn">Login</button>
  </form>

  <?php else: ?>
  <!-- MAIN SENDER -->
  <form method="POST">
    <button type="submit" name="logout" class="btn-logout">Logout</button>

    <?php if ($error): ?>
      <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>

    <?php if ($success): ?>
      <div class="alert alert-success"><?= htmlspecialchars($success) ?></div>
      <div class="stats">
        <?php
          $s = 0; $f = 0;
          foreach ($results as $r) { if ($r['status']==='ok') $s++; else $f++; }
        ?>
        <div class="stat"><div class="stat-num"><?= $s ?></div><div class="stat-label">Sent</div></div>
        <div class="stat"><div class="stat-num"><?= $f ?></div><div class="stat-label">Failed</div></div>
        <div class="stat"><div class="stat-num"><?= count($members) ?></div><div class="stat-label">Total members</div></div>
      </div>
    <?php endif; ?>

    <label>Send to</label>
    <div class="filter-row">
      <select name="filter" id="filterType" onchange="updateFilter()">
        <option value="all">All members (<?= count($members) ?>)</option>
        <option value="tribe">By Tribe</option>
        <option value="diocese">By Diocese</option>
        <option value="state">By State</option>
      </select>
      <select name="filter_value" id="filterValue" style="display:none">
        <option value="">Select...</option>
      </select>
    </div>
    <div class="member-count" id="memberCount">
      📊 <?= count($members) ?> members will receive this message
    </div>

    <label>Message</label>
    <textarea name="message" placeholder="Type your message here...

You can use:
{name} → member's first name
{tribe} → their tribe
{diocese} → their diocese
{state} → their state

Example:
Dear {name}, greetings from CLA! 🙏"><?= htmlspecialchars($_POST['message'] ?? '') ?></textarea>
    <div class="hint">⚠️ Max <?= MAX_PER_RUN ?> messages per run. Run again to continue if you have more.</div>

    <button type="submit" name="send" class="btn">
      📱 Send WhatsApp Messages
    </button>
  </form>

  <?php if (!empty($results)): ?>
  <hr class="divider">
  <div style="font-size:13px;font-weight:600;color:#444;margin-bottom:8px">Send Results</div>
  <div class="results">
    <?php foreach ($results as $r): ?>
    <div class="result-row">
      <div class="dot <?= $r['status']==='ok' ? 'dot-ok' : 'dot-fail' ?>"></div>
      <div style="flex:1">
        <span style="font-weight:500"><?= htmlspecialchars($r['name']) ?></span>
        <span style="color:#999;margin-left:6px"><?= htmlspecialchars($r['phone']) ?></span>
      </div>
      <?php if ($r['status'] !== 'ok'): ?>
        <div style="color:#e74c3c;font-size:12px"><?= htmlspecialchars($r['error']) ?></div>
      <?php endif; ?>
    </div>
    <?php endforeach; ?>
  </div>
  <?php endif; ?>

  <?php endif; ?>
</div>

<script>
var tribes   = <?= json_encode($tribes) ?>;
var dioceses = <?= json_encode($dioceses) ?>;
var states   = <?= json_encode($states) ?>;
var members  = <?= json_encode(array_map(function($m){ return ['tribe'=>$m[2],'diocese'=>$m[3],'state'=>$m[4]]; }, $members)) ?>;

function updateFilter() {
  var type = document.getElementById('filterType').value;
  var sel  = document.getElementById('filterValue');
  var cnt  = document.getElementById('memberCount');
  sel.innerHTML = '<option value="">Select...</option>';

  var options = [];
  if (type === 'tribe')   options = tribes;
  if (type === 'diocese') options = dioceses;
  if (type === 'state')   options = states;

  if (options.length > 0) {
    sel.style.display = 'block';
    options.forEach(function(o) {
      var opt = document.createElement('option');
      opt.value = o; opt.text = o;
      sel.appendChild(opt);
    });
    sel.onchange = function() {
      var count = members.filter(function(m) {
        return m[type] && m[type].toLowerCase() === sel.value.toLowerCase();
      }).length;
      cnt.textContent = '📊 ' + count + ' members will receive this message';
    };
    cnt.textContent = '📊 Select a ' + type + ' to see count';
  } else {
    sel.style.display = 'none';
    cnt.textContent = '📊 <?= count($members) ?> members will receive this message';
  }
}
</script>
</body>
</html>