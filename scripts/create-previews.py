"""Original SVG concept illustrations; not screenshots of completed projects."""
from pathlib import Path

def text(x,y,s,size=14,fill='#6d6d62',weight='400'):
 return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" font-weight="{weight}">{s}</text>'
def rect(x,y,w,h,fill,stroke='none',r=0):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}"/>'
def svg(body,bg):return f'<svg xmlns="http://www.w3.org/2000/svg" width="960" height="680" viewBox="0 0 960 680"><rect width="960" height="680" fill="{bg}"/><g font-family="Arial, sans-serif">{body}</g></svg>'
# Organizer — warm, typographic product concept.
s=rect(70,66,820,546,'#f0eee5')+rect(70,66,175,546,'#e3e1d5')
s+=text(97,110,'organizer',22,'#33382f','600')+text(97,151,'YOUR OWN PACE',8)
for i,v in enumerate(['Overview','My projects','Calendar','Notes']):s+=text(100,221+i*40,v,12,'#393f33' if i==0 else '#777b6e')
s+=text(98,570,'PERSONAL WORKSPACE',8)+text(280,111,'MONDAY / A FRESH START',9)+text(280,173,'Make room for what matters.',27,'#30362d')
s+=text(280,209,'A clear head starts with a clear list.',12)
s+=rect(280,245,570,1,'#d0d2c3')+text(282,280,'TODAY',9)+text(790,280,'03 TASKS',9)
for i,(title,tag) in enumerate([('Plan the next small step','PERSONAL'),('Connect the API','DEVELOPMENT'),('Review and reflect','ROUTINE')]):
 y=318+i*72;s+=rect(285,y-14,15,15,'none','#a5ad98',3)+text(315,y,title,15,'#424938')+text(729,y,tag,8)+rect(280,y+24,570,1,'#d4d7c9')
s+=text(283,573,'LESS NOISE. MORE INTENTION.',9,'#8c967e')
Path('public/previews/organizer.svg').write_text(svg(s,'#a9b29b'))
# Atlas — readable technical trace, not fabricated telemetry.
s=rect(64,68,832,542,'#1a2020','#4b5450')+text(94,112,'REQUEST ATLAS',13,'#d9dbd1')+text(701,111,'TRACE EXPLORER',9,'#98a298')+rect(64,138,832,1,'#404943')
s+=text(102,188,'GET /api/projects',25,'#dce0d5')+text(102,220,'FOLLOW THE REQUEST',9,'#aebfa6')
for i,(name,desc) in enumerate([('CLIENT','Request created'),('GATEWAY','Token validated'),('SERVICE','Project query'),('DATABASE','Rows returned')]):
 x=104+i*188;s+=rect(x,296,158,90,'#202b26','#55694f')+text(x+17,327,name,10,'#d0d9c8')+text(x+17,356,desc,10,'#93a78b')
 if i<3:s+=f'<path d="M{x+158} 341h30" stroke="#a1b58e"/><path d="m{x+181} 337 7 4-7 4" fill="none" stroke="#a1b58e"/>'
s+=rect(104,437,750,112,'#141b17')+text(125,466,'CONTEXT',9,'#9ea997')+text(125,495,'request.id     → shared across service boundaries',12,'#c4ccbd')+text(125,522,'response       → status · headers · payload',12,'#88967d')
Path('public/previews/atlas.svg').write_text(svg(s,'#687660'))
# Local Context — source first, simple experimental product.
s=rect(67,65,826,550,'#ece9e1')+text(100,111,'local context',22,'#3b3d35')+text(738,109,'ON YOUR MACHINE',8)+rect(67,140,826,1,'#d1cfc5')
s+=text(103,198,'Knowledge, with a source.',30,'#34392e')+text(105,232,'A small, local research companion.',13)
s+=rect(103,278,267,268,'#e1ded3')+text(124,314,'YOUR LIBRARY',9)+text(123,354,'architecture.md',14,'#525743')+text(123,391,'system-design.pdf',14,'#525743')+text(123,428,'research-notes.txt',14,'#525743')+text(123,516,'LOCAL FILES / LOCAL MODELS',8)
s+=rect(405,278,447,63,'#f7f5ed','#c6c8b7',4)+text(423,315,'What happens after a request arrives?',14,'#454c37')
s+=text(407,389,'GROUNDED IN YOUR DOCUMENTS',9,'#7a8569')+text(407,425,'Retrieve the relevant passages.',17,'#4c5640')+text(407,459,'Build context. Then ask the model.',17,'#4c5640')+rect(408,498,290,32,'#d8dfc9',r=3)+text(422,519,'SOURCE / architecture.md',10,'#596a45')
Path('public/previews/context.svg').write_text(svg(s,'#b8b2a5'))
# Dispatch — operations queue, illustrative state labels, no fake metrics.
s=rect(62,68,836,546,'#212320')+text(96,113,'dispatch',24,'#e5e7dd')+text(721,108,'WORKER CONSOLE',9,'#a3ac94')+rect(62,140,836,1,'#44493b')
s+=text(96,197,'Work keeps moving.',30,'#e2e6d7')+text(96,228,'A clear view of the jobs behind the application.',12,'#9ca78c')
for i,(name,state) in enumerate([('QUEUED','Awaiting worker'),('PROCESSING','Worker assigned'),('COMPLETED','Result stored')]):
 x=98+i*260;s+=text(x,291,name,10,'#aebf91')
 for j,title in enumerate(['Generate report','Sync records']):
  y=320+j*111;s+=rect(x,y,236,91,'#2d3228','#535c46',3)+text(x+17,y+28,title,15,'#d9e0ca')+text(x+17,y+61,state,10,'#9eae85')
s+=text(98,586,'QUEUE → WORKER → RESULT',9,'#a5b891')
Path('public/previews/dispatch.svg').write_text(svg(s,'#858f73'))
