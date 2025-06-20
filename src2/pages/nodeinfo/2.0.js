import axios from '@/lib/axios'

export async function getServerSideProps({ req, res, context, query }) {
  const data = {
    "version": "2.0",
    "software": { "name": "amiverse", "version": "0.0.4" },
    "protocols": ["activitypub"],
    "services": { "inbound": [], "outbound": ["atom1.0", "rss2.0"] },
    "openRegistrations": true,
    "usage": { "users": { "total": 1, "activeHalfyear": null, "activeMonth": null },
    "localPosts": 1, "localComments": 0 },
    "metadata": { "nodeName": "Amiverse.net", "nodeDescription": "Amiverseです。",
      "maintainer": { "name": "Kisana", "email": "https://amiverse.net/@kisana" },
      "langs": ["ja", "en"],
      "tosUrl": "http://amiverse.net/tos",
      "repositoryUrl": "https://github.com/kisana528/amiverse",
      "feedbackUrl": "https://github.com/kisana528/amiverse/issues/new",
      "disableRegistration": false,
      "disableLocalTimeline": false,
      "disableGlobalTimeline": false,
      "emailRequiredForSignup": true,
      "enableHcaptcha": false,
      "enableRecaptcha": false,
      "maxNoteTextLength": 3000,
      "enableEmail": true,
      "enableServiceWorker": true,
      "proxyAccountName": "ghost",
      "themeColor": "#86b300"
    }
  }
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify(data))
  res.end()
  return { props: {} }
}

export default function Nodeinfo2_0() { }