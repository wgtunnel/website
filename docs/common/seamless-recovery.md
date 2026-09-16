---
sidebar_position: 7
---

# Seamless Recovery

Recovers from handshake failures or network changes by bouncing the connection alone, without ever
tearing down the tunnel interface or the kill switch. Traffic stays locked down the entire time, so a
recovery cycle never opens a leak window the way a full tunnel restart would.

## Recovery Bounce Delay

How long to wait after a failure is detected before bouncing the connection. Shorter delays recover
faster but risk reacting to brief, self-resolving blips; longer delays are more tolerant of flaky
networks at the cost of a slower recovery.

## Platform Differences

Android additionally surfaces a Recovery Details view showing how many recovery events have occurred
and when the last one happened, useful for confirming recovery is working as expected on a flaky
connection.
