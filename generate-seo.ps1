param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^https://[^\s/$.?#][^\s]*$')]
  [string]$SiteUrl
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$origin = $SiteUrl.TrimEnd('/')
$indexable = @(
  @{ File = 'index.html'; Path = '/' },
  @{ File = 'privacy.html'; Path = '/privacy.html' }
)

foreach ($page in $indexable) {
  $file = Join-Path $root $page.File
  $html = [IO.File]::ReadAllText($file)
  $url = $origin + $page.Path
  $html = [regex]::Replace($html, '\s*<link rel="canonical" href="[^"]*">', '')
  $html = [regex]::Replace($html, '\s*<meta property="og:url" content="[^"]*">', '')
  $html = [regex]::Replace($html, '\s*<meta property="og:image(?::alt)?" content="[^"]*">', '')
  $html = [regex]::Replace($html, '\s*<meta name="twitter:(?:card|title|description|image)" content="[^"]*">', '')
  $html = [regex]::Replace($html, '\s*<script type="application/ld\+json" data-generated-seo>.*?</script>', '', [Text.RegularExpressions.RegexOptions]::Singleline)
  $title = [regex]::Match($html, '<title>(.*?)</title>', [Text.RegularExpressions.RegexOptions]::Singleline).Groups[1].Value
  $description = [regex]::Match($html, '<meta name="description" content="([^"]*)">').Groups[1].Value
  $tags = @(
    "<link rel=`"canonical`" href=`"$url`">",
    "<meta property=`"og:url`" content=`"$url`">",
    "<meta property=`"og:image`" content=`"$origin/assets/img/maharaj.webp`">",
    "<meta property=`"og:image:alt`" content=`"Shramana Muni Shri 108 Nirmoh Sagar Ji Maharaj`">",
    "<meta name=`"twitter:card`" content=`"summary`">",
    "<meta name=`"twitter:title`" content=`"$title`">",
    "<meta name=`"twitter:description`" content=`"$description`">",
    "<meta name=`"twitter:image`" content=`"$origin/assets/img/maharaj.webp`">"
  )
  if ($page.Path -eq '/') {
    $schema = @{ '@context' = 'https://schema.org'; '@type' = 'WebSite'; name = 'Nirmoh Vatika'; url = $url; description = $description } | ConvertTo-Json -Compress
    $tags += "<script type=`"application/ld+json`" data-generated-seo>$schema</script>"
  }
  $html = $html -replace '</head>', ("`r`n" + ($tags -join "`r`n") + "`r`n</head>")
  [IO.File]::WriteAllText($file, $html, [Text.UTF8Encoding]::new($false))
}

$robots = "User-agent: *`r`nAllow: /`r`n`r`nSitemap: $origin/sitemap.xml`r`n"
[IO.File]::WriteAllText((Join-Path $root 'robots.txt'), $robots, [Text.UTF8Encoding]::new($false))
$urls = ($indexable | ForEach-Object { "  <url><loc>$origin$($_.Path)</loc></url>" }) -join "`r`n"
$sitemap = "<?xml version=`"1.0`" encoding=`"UTF-8`"?>`r`n<urlset xmlns=`"http://www.sitemaps.org/schemas/sitemap/0.9`">`r`n$urls`r`n</urlset>`r`n"
[IO.File]::WriteAllText((Join-Path $root 'sitemap.xml'), $sitemap, [Text.UTF8Encoding]::new($false))
Write-Host "Updated canonical URLs, robots.txt and sitemap.xml for $origin"
